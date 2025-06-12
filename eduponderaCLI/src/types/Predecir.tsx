import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
  DimensionValue,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './navigation';

type PredecirRouteProp = RouteProp<RootStackParamList, 'Predecir'>;

const Predecir = () => {
  const route = useRoute<PredecirRouteProp>();
  const navigation = useNavigation();
  const { corte } = route.params;

  const [notaActual, setNotaActual] = useState('');
  const [promedioDeseado, setPromedioDeseado] = useState('');
  const [resultado, setResultado] = useState('');
  const [invalido, setInvalido] = useState(false);

  const valorRestante = 1 - corte.evaluaciones.reduce((acc, ev) => acc + ev.valor / 100, 0);

  const handleCalcular = () => {
    const deseado = parseFloat(promedioDeseado);
    const actual = parseFloat(notaActual);

    const necesaria = (deseado - actual) / valorRestante;

    if (necesaria > 5 || necesaria < 0) {
      setResultado('No es posible alcanzar ese promedio con la ponderación restante.');
      setInvalido(true);
    } else {
      setResultado(`Necesitas sacar ${necesaria.toFixed(1)} en su próxima evaluación para alcanzar tu objetivo.`);
      setInvalido(false);
    }
  };

  const disabled =
    promedioDeseado === '' ||
    notaActual === '' ||
    isNaN(parseFloat(promedioDeseado)) ||
    isNaN(parseFloat(notaActual)) ||
    valorRestante <= 0;

  const progreso = Math.min(1, parseFloat(notaActual || '0') / 5);
  const progressWidth = `${(progreso * 100).toFixed(1)}%` as DimensionValue;

  return (
    <Modal animationType="slide" transparent={false} visible>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Volver</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>Predicción de Nota</Text>

        <TextInput
          style={styles.input}
          placeholder="Nota actual"
          keyboardType="numeric"
          value={notaActual}
          onChangeText={setNotaActual}
        />

        <TextInput
          style={styles.input}
          placeholder="Promedio objetivo"
          keyboardType="numeric"
          value={promedioDeseado}
          onChangeText={setPromedioDeseado}
        />

        <TouchableOpacity
          style={[styles.boton, disabled && styles.botonDisabled]}
          onPress={handleCalcular}
          disabled={disabled}
        >
          <Text style={styles.botonTexto}>Calcular</Text>
        </TouchableOpacity>

        {resultado !== '' && (
          <Text style={[styles.resultado, invalido && styles.error]}>{resultado}</Text>
        )}

        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>Nota actual</Text>
          <View style={styles.slider}>
            <View style={[styles.sliderProgress, { width: progressWidth }]} />
          </View>
          <Text style={styles.sliderLabel}>Objetivo</Text>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default Predecir;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  back: {
    color: '#007AFF',
    marginBottom: 10,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  boton: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  botonDisabled: {
    backgroundColor: '#ccc',
  },
  botonTexto: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  resultado: {
    textAlign: 'center',
    fontSize: 16,
    color: 'green',
    marginBottom: 10,
  },
  error: {
    color: 'red',
  },
  sliderContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  slider: {
    width: '100%',
    height: 6,
    backgroundColor: '#eee',
    borderRadius: 3,
    overflow: 'hidden',
    marginVertical: 10,
  },
  sliderProgress: {
    height: 6,
    backgroundColor: 'black',
  },
  sliderLabel: {
    fontSize: 12,
    color: '#333',
  },
});