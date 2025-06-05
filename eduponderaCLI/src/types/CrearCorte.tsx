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
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './navigation';
import { StackNavigationProp } from '@react-navigation/stack';

type CrearCorteRouteProp = RouteProp<RootStackParamList, 'CrearCorte'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'CrearCorte'>;

const CrearCorte = () => {
  const route = useRoute<CrearCorteRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { materiaId, nombreMateria, cortesActuales } = route.params;

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
      Alert.alert(
        'Error',
        'Complete los campos correctamente. La ponderación debe ser válida y no exceder el 100%.'
      );
      return;
    }

    const nuevoCorte = {
      id: Date.now().toString(),
      nombre: nombreCorte,
      ponderacion: parseFloat(ponderacion),
      evaluaciones: [],
    };

    // Aquí deberías manejar cómo enviar el nuevo corte a VistaMateriaDetalle
    // (contexto global, redux, o props callback según lo estés manejando)
    Alert.alert('Éxito', `Corte "${nombreCorte}" agregado.`);
    navigation.goBack();
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

      <TouchableOpacity style={styles.botonNegro}>
        <Text style={styles.botonTexto}>Añadir un Elemento ⊕</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.botonVerde,
          !esValido() && styles.botonDeshabilitado,
        ]}
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
