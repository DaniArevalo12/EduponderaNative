import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { Corte } from '.';

type RouteParams = RouteProp<RootStackParamList, 'VistaMateriaDetalle'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'VistaMateriaDetalle'>;

export default function VistaMateriaDetalle() {
  const route = useRoute<RouteParams>();
  const navigation = useNavigation<NavigationProp>();
  const { materia } = route.params;

  const [cortes, setCortes] = useState<Corte[]>(materia.cortes ?? []);
  const [busqueda, setBusqueda] = useState('');

  const handleAgregarCorte = () => {
    navigation.navigate('CrearCorte', {
      materiaId: materia.id,
      nombreMateria: materia.nombre,
      cortesActuales: cortes,
      onCorteAgregado: (nuevoCorte: Corte) => {
        setCortes((prev) => [...prev, nuevoCorte]);
      },
    });
  };

  const cortesFiltrados = cortes.filter((corte) =>
    corte.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="🔍 Buscar"
        style={styles.buscador}
        value={busqueda}
        onChangeText={setBusqueda}
      />

      <FlatList
        data={cortesFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemCorte}
            onPress={() =>
              navigation.navigate('EvaluacionesPorCorte', {
                materia: materia,
                corte: item,
              })
            }
          >
            <Text style={styles.nombreCorte}>{item.nombre}</Text>
            <Text style={styles.detalleCorte}>{item.descripcion}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.vacio}>
            <Text style={styles.mensajeVacio}>No hay cortes registrados.</Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 30 }}
      />

      <TouchableOpacity style={styles.botonAgregar} onPress={handleAgregarCorte}>
        <Text style={styles.textoBoton}>Agregar Corte</Text>
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
  buscador: {
    height: 40,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 16,
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
  mensajeVacio: {
    fontSize: 16,
    color: '#999',
  },
});
