import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { StackNavigationProp } from '@react-navigation/stack';

type RouteParams = RouteProp<RootStackParamList, 'VistaMateriaDetalle'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'VistaMateriaDetalle'>;

export default function VistaMateriaDetalle() {
  const route = useRoute<RouteParams>();
  const navigation = useNavigation<NavigationProp>();
  const { materia } = route.params;

const handleAgregarCorte = () => {
  navigation.navigate('CrearCorte', {
    materiaId: materia.id,
    nombreMateria: materia.nombre,
    cortesActuales: materia.cortes ?? [],
  });
};


//.
  return (
    <View style={styles.container}>
      <Text style={styles.nombreMateria}>{materia.nombre}</Text>
      <FlatList
        data={materia.cortes ?? []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemCorte}>
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
  mensajeVacio: {
    fontSize: 16,
    color: '#999',
  },
});
