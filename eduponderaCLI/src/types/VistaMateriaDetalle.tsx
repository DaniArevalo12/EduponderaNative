import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Materia } from '../types';

// Update the props to accept an array of materias
interface VistaMateriaDetalleProps {
  materias: Materia[];
  onSeleccionar?: (materia: Materia) => void;
  onAgregar?: () => void;
}

export default function VistaMateriaDetalle({
  materias,
  onSeleccionar,
  onAgregar,
}: VistaMateriaDetalleProps) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.nombreMateria}>Tus Materias</Text>
      <FlatList
        data={materias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemCorte}
            onPress={() => onSeleccionar && onSeleccionar(item)}
          >
            <Text style={styles.nombreCorte}>{item.nombre}</Text>
            <Text style={styles.detalleCorte}>{item.descripcion}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.vacio}>
            <Text style={styles.mensajeVacio}>No hay materias registradas.</Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 30 }}
      />
      <TouchableOpacity style={styles.botonAgregar} onPress={onAgregar}>
        <Text style={styles.textoBoton}>Agregar Materia</Text>
        <Text style={styles.iconoMas}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  nombreMateria: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  botonAgregar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 20,
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16,
    marginRight: 8,
  },
  iconoMas: {
    color: '#fff',
    fontSize: 20,
  },
  itemCorte: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  nombreCorte: {
    fontSize: 18,
    fontWeight: '600',
  },
  detalleCorte: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  vacio: {
    alignItems: 'center',
    marginTop: 60,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 12,
  },
  mensajeVacio: {
    fontSize: 16,
    color: '#999',
  },
});