import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useAppData } from './AppDataContext';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { Corte } from '.';

type CrearCorteRouteProp = RouteProp<RootStackParamList, 'CrearCorte'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'CrearCorte'>;

const CrearCorte = () => {
  const route = useRoute<CrearCorteRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { materiaId, nombreMateria, cortesActuales, onCorteAgregado } = route.params;

  // Cambia el tipo para incluir nota
  const [evaluaciones, setEvaluaciones] = useState<{ nombre: string; valor: number; nota: number }[]>([]);

  const [nombreCorte, setNombreCorte] = useState('');
  const [ponderacion, setPonderacion] = useState('');

  const sumaPonderaciones = cortesActuales.reduce(
    (sum, corte) => sum + corte.ponderacion,
    0
  );
  const restante = 100 - sumaPonderaciones;

  const esValido = () => {
    const pond = parseFloat(ponderacion);
    return (
      nombreCorte.trim().length > 0 &&
      !isNaN(pond) &&
      pond > 0 &&
      pond <= restante
    );
  };

  const agregarCorte = () => {
    if (!esValido()) {
      Alert.alert('Error', 'Complete los campos correctamente.');
      return;
    }

    const nuevoCorte: Corte = {
      id: Date.now().toString(),
      nombre: nombreCorte,
      ponderacion: parseFloat(ponderacion),
      evaluaciones, // ahora todas tienen nota
      descripcion: '',
      materiaId: '',
      porcentaje: 0,
      valor: undefined
    };

    const sumaEvaluaciones = evaluaciones.reduce((acc, ev) => acc + ev.valor, 0);
// if (sumaEvaluaciones !== 100) {
//   Alert.alert('Error', 'La suma de las ponderaciones del corte debe ser exactamente 100%');
//   return;
// }

    onCorteAgregado(nuevoCorte);
    navigation.goBack();
  };

  // Añade nota: 0 al crear una nueva evaluación
const añadirElemento = () => {
  const sumaActual = evaluaciones.reduce((acc, ev) => acc + ev.valor, 0);

  if (sumaActual >= 100) {
    Alert.alert('Error', 'La suma de las ponderaciones de los elementos no puede superar el 100%');
    return;
  }

  setEvaluaciones((prev) => [...prev, { nombre: '', valor: 0, nota: 0 }]);
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Agregar Corte a {nombreMateria}</Text>

      <Text style={styles.label}>Nombre del corte</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Primer Corte"
        value={nombreCorte}
        onChangeText={setNombreCorte}
      />

      <Text style={styles.label}>Ponderación (%)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: 30"
        keyboardType="numeric"
        value={ponderacion}
        onChangeText={setPonderacion}
      />

      <TouchableOpacity style={styles.botonNegro} onPress={añadirElemento}>
        <Text style={styles.botonTexto}>Añadir un Elemento ⊕</Text>
      </TouchableOpacity>

      {evaluaciones.map((ev, index) => (
        <View key={index}>
          <TextInput
            style={styles.input}
            placeholder={`Elemento ${index + 1}`}
            value={ev.nombre}
            onChangeText={(text) => {
              const nuevos = [...evaluaciones];
              nuevos[index].nombre = text;
              setEvaluaciones(nuevos);
            }}
          />
          <TextInput
  style={styles.input}
  placeholder="Ponderación del elemento (%)"
  keyboardType="numeric"
  value={ev.valor.toString()}
  onChangeText={(text) => {
    const nuevos = [...evaluaciones];
    const nuevoValor = parseFloat(text);

    if (text.trim() === '') {
      nuevos[index].valor = 0;
      setEvaluaciones(nuevos);
      return;
    }

    if (!isNaN(nuevoValor)) {
      const sumaSinActual = evaluaciones.reduce(
        (acc, ev, i) => (i === index ? acc : acc + ev.valor),
        0
      );

      if (sumaSinActual + nuevoValor > 100) {
        Alert.alert('Error', 'La suma de las ponderaciones no puede superar el 100%');
        return;
      }

      nuevos[index].valor = nuevoValor;
      setEvaluaciones(nuevos);
    }
  }}
/>

          

        </View>
      ))}

      <TouchableOpacity
        style={[styles.botonVerde, !esValido() && styles.botonDeshabilitado]}
        onPress={agregarCorte}
        disabled={!esValido()}
      >
        <Text style={styles.botonTexto}>Agregar Corte ⊕</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CrearCorte;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 8,
    padding: 10,
  },
  botonNegro: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  botonVerde: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
  },
  botonDeshabilitado: {
    backgroundColor: '#ccc',
  },
  botonTexto: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});