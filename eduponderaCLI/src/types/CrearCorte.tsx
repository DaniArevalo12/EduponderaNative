import React, { useState } from 'react';
import {
  View, Text, TextInput, Button, Alert, StyleSheet,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from './navigation';
import { StackNavigationProp } from '@react-navigation/stack';

type RouteProps = RouteProp<RootStackParamList, 'CrearCorte'>;
type NavigationProp = StackNavigationProp<RootStackParamList>;

export default function AgregarCorte() {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProp>();
  const { nombreMateria, cortesActuales } = route.params;

  const [nombre, setNombre] = useState('');
  const [ponderacion, setPonderacion] = useState('');

  const handleGuardar = () => {
    const nuevaPonderacion = parseFloat(ponderacion);
    const total = cortesActuales.reduce((acc, corte) => acc + corte.ponderacion, 0);

    if (total + nuevaPonderacion > 100) {
      Alert.alert(
        'Error de Ponderación',
        `La suma de las ponderaciones supera el 100%. Actualmente: ${total}%.`
      );
      return;
    }

    Alert.alert('Corte Agregado', `${nombre} (${nuevaPonderacion}%)`);
    navigation.goBack(); // o manejar el agregado en contexto/estado global
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Corte</Text>
      <Text>Materia: {nombreMateria}</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del Corte"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Ponderación (%)"
        keyboardType="numeric"
        value={ponderacion}
        onChangeText={setPonderacion}
      />

      <Button title="Guardar Corte" onPress={handleGuardar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
});
