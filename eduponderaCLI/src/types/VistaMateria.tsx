import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Materia } from '.';

interface Props {
  materias: Materia[];
  onAgregar: () => void;
  onSeleccionar: (materia: Materia) => void;
}

export default function VistaMaterias({ materias, onAgregar, onSeleccionar }: Props) {
  return (
    <View style={styles.container}>
      <FlatList
        data={materias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSeleccionar(item)} style={styles.itemContainer}>
            {item.fondo && item.fondo.startsWith('http') ? (
              <ImageBackground
                source={{ uri: item.fondo }}
                style={styles.card}
                imageStyle={styles.imageBackground}
              >
                <Text style={styles.cardText}>{item.nombre}</Text>
              </ImageBackground>
            ) : (
              <View style={[styles.card, { backgroundColor: item.color || '#f0f0f0' }]}>
                <Text style={styles.cardText}>{item.nombre}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={onAgregar}>
        <Text style={styles.addButtonText}>➕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  itemContainer: { marginBottom: 12 },
  card: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardText: { color: '#000', fontSize: 16, fontWeight: 'bold' },
  imageBackground: { resizeMode: 'cover' },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6200ee',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  addButtonText: { color: '#fff', fontSize: 30 },
});
