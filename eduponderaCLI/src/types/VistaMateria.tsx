import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  
} from 'react-native';
import { Materia } from '../types';

interface VistaMateriasProps {
  materias: Materia[];
  onAgregar: () => void;
  onSeleccionar: (materia: Materia) => void;
}

export default function VistaMaterias({
  materias,
  onAgregar,
  onSeleccionar,
}: VistaMateriasProps) {
  const [busqueda, setBusqueda] = useState('');

  const materiasFiltradas = materias.filter((materia) =>
    materia.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="🔍 Search"
        style={styles.buscador}
        value={busqueda}
        onChangeText={setBusqueda}
      />

      <FlatList
        data={materiasFiltradas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSeleccionar(item)}>
            <ImageBackground
              source={item.fondo ? { uri: item.fondo } : undefined}
              style={[styles.card, item.fondo ? {} : { backgroundColor: item.color || '#eee' }]}
              imageStyle={styles.imagenFondo}
            >
              <Text style={styles.nombreMateria}>{item.nombre}</Text>
            </ImageBackground>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listaMaterias}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buscador: {
    height: 40,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  listaMaterias: {
    paddingBottom: 80,
  },
  card: {
    height: 120,
    borderRadius: 12,
    justifyContent: 'flex-end',
    padding: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  imagenFondo: {
    borderRadius: 12,
  },
  nombreMateria: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
