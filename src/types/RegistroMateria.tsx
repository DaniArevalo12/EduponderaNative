import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Materia } from '.';

interface Props {
  onMateriaAgregada: (materia: Materia) => void;
}

export default function RegistroMateria({ onMateriaAgregada }: Props) {
  const [nombre, setNombre] = useState('');
  const [nota, setNota] = useState('');
  const [porcentaje, setPorcentaje] = useState('');

  const handleSubmit = () => {
    const nuevaMateria: Materia = {
      id: Date.now().toString(),
      nombre,
      nota: parseFloat(nota),
      porcentaje: parseFloat(porcentaje),
    };
    onMateriaAgregada(nuevaMateria);
    setNombre('');
    setNota('');
    setPorcentaje('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre de la materia</Text>
      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} placeholder="Ej: Matemáticas" />
      <Text style={styles.label}>Nota actual</Text>
      <TextInput style={styles.input} value={nota} onChangeText={setNota} keyboardType="numeric" />
      <Text style={styles.label}>Porcentaje</Text>
      <TextInput style={styles.input} value={porcentaje} onChangeText={setPorcentaje} keyboardType="numeric" />
      <Button title="Agregar materia" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { fontWeight: 'bold', marginTop: 8 },
  input: { borderWidth: 1, borderColor: '#aaa', padding: 8, marginBottom: 12, borderRadius: 5 },
});
