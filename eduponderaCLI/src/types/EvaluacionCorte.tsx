import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './navigation';
import { StackNavigationProp } from '@react-navigation/stack';

type RouteParams = RouteProp<RootStackParamList, 'EvaluacionesPorCorte'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'EvaluacionesPorCorte'>;

const EvaluacionesPorCorte = () => {
  const route = useRoute<RouteParams>();
  const navigation = useNavigation<NavigationProp>();
  const { corte, materia } = route.params;

  // Guardamos notas como strings para permitir ingreso decimal
  const [notas, setNotas] = useState<string[]>(
    corte.evaluaciones.map((ev) => ev.nota?.toString() ?? '')
  );

  const handleNotaChange = (index: number, value: string) => {
    const nuevasNotas = [...notas];
    nuevasNotas[index] = value;
    setNotas(nuevasNotas);
  };

  const handlePredecir = () => {
    navigation.navigate('Predecir', { corte });
  };

  const [modoEdicion, setModoEdicion] = useState<boolean>(false);

  const toggleModoEdicion = () => {
    setModoEdicion(!modoEdicion);
  };

  

  const calcularDefinitiva = () => {
    const definitiva = notas.reduce((total, notaStr, i) => {
      const nota = parseFloat(notaStr.replace(',', '.'));
      const ponderacion = corte.evaluaciones[i].valor / 100;
      return total + nota * ponderacion;
    }, 0);
    return definitiva.toFixed(1);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.materia}>{materia.nombre}</Text>

      <View style={styles.card}>
        <View style={styles.corteHeader}>
          <Text style={styles.corteNombre}>{corte.nombre}</Text>
          <Text style={styles.cortePorcentaje}>{corte.valor}%</Text>
        </View>

        {corte.evaluaciones.map((ev, i) => (
          <View style={styles.evaluacion} key={i}>
            <Text style={styles.evaluacionNombre}>{ev.nombre}</Text>
            <TextInput
              placeholder="Nota"
              keyboardType="decimal-pad"
              style={styles.inputNota}
              value={notas[i]}
              onChangeText={(text) => handleNotaChange(i, text)}
            />
            <Text style={styles.porcentaje}>{ev.valor}%</Text>
          </View>
        ))}

        <View style={styles.definitivaContainer}>
          <Text style={styles.definitivaLabel}>Definitiva</Text>
          <Text style={styles.definitivaNota}>{calcularDefinitiva()}</Text>
        </View>
      </View>


      <TouchableOpacity style={styles.predecirBtn} onPress={handlePredecir}>
        <Text style={styles.predecirText}>Predecir</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EvaluacionesPorCorte;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  materia: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  corteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  corteNombre: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 16,
  },
  cortePorcentaje: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  evaluacion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  evaluacionNombre: {
    flex: 1,
  },
  inputNota: {
    backgroundColor: '#eee',
    padding: 8,
    borderRadius: 6,
    width: 60,
    textAlign: 'center',
  },
  porcentaje: {
    width: 50,
    textAlign: 'right',
  },
  definitivaContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  definitivaLabel: {
    color: 'red',
    fontWeight: 'bold',
  },
  definitivaNota: {
    backgroundColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  agregarCorteBtn: {
    backgroundColor: 'black',
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
  },
  agregarCorteText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  predecirBtn: {
    alignSelf: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  predecirText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
});
