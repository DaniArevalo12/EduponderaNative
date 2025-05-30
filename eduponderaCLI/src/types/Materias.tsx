import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Materia } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Materias'>;
  materias: Materia[];
};

export default function Materias({ navigation, materias }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Materias</Text>
      <FlatList
        data={materias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: item.color || '#eee' }]}
            onPress={() => navigation.navigate('VistaMateria', { materiaId: item.id })}
          >
            <Text style={styles.cardText}>{item.nombre}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('RegistroMateria')}
      >
        <Text style={styles.addButtonText}>➕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  card: { padding: 15, borderRadius: 10, elevation: 2 },
  cardText: { fontSize: 16 },
  addButton: {
    position: 'absolute', right: 20, bottom: 20,
    backgroundColor: '#007bff', padding: 15, borderRadius: 30,
  },
  addButtonText: { color: '#fff', fontSize: 24 },
});
