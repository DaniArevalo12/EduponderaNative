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
import { Corte, Materia } from '../types';

interface VistaMateriaDetalleProps {
  materia: Materia;
  cortes: Corte[];
  onAgregarCorte: (materiaId: string) => void;
}

export default function VistaMateriaDetalle({
  materia,
  cortes,
  onAgregarCorte,
}: VistaMateriaDetalleProps) {
  const navigation = useNavigation();

  const cortesDeMateria = cortes.filter((corte) => corte.materiaId === materia.id);

  return (
    <View style={styles.container}>
      {/* Nombre de la materia */}
      <Text style={styles.nombreMateria}>{materia.nombre}</Text>

      {/* Botón agregar corte */}
      <TouchableOpacity
        style={styles.botonAgregar}
        onPress={() => onAgregarCorte(materia.id)}
      >
        <Text style={styles.textoBoton}>Agregar Corte</Text>
        <Text style={styles.iconoMas}>＋</Text>
      </TouchableOpacity>

      {/* Lista de cortes */}
      <FlatList
        data={cortesDeMateria}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemCorte}>
            <Text style={styles.nombreCorte}>{item.nombre}</Text>
            <Text style={styles.detalleCorte}>{item.descripcion}</Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.vacio}>
            <Text style={styles.mensajeVacio}>No hay cortes registrados.</Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 30 }}
      />
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
