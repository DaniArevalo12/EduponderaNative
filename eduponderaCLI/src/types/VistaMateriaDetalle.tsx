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
import { Corte } from '../types'; // ← asegúrate de importar desde el archivo correcto

type RouteParams = RouteProp<RootStackParamList, 'VistaMateriaDetalle'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'VistaMateriaDetalle'>;

export default function VistaMateriaDetalle() {
  const route = useRoute<RouteParams>();
  const navigation = useNavigation<NavigationProp>();
  const { materia } = route.params;

  const [cortes, setCortes] = useState<Corte[]>(materia.cortes ?? []);
  const [busqueda, setBusqueda] = useState('');

  const calcularPromedio = () => {
    //const cortesConNota = cortes.filter(
      //c => typeof c.notaFinal === 'number' && typeof c.ponderacion === 'number'
    //);
    //const totalPeso = cortesConNota.reduce((acc, c) => acc + c.ponderacion, 0);
    //const sumaNotas = cortesConNota.reduce((acc, c) => acc + (c.notaFinal! * c.ponderacion!), 0);
    //return totalPeso > 0 ? (sumaNotas / totalPeso).toFixed(2) : '0.00';
  };

/*const handlePredecir = () => {
  navigation.navigate('PantallaPrediccion', {
    materia: materia,
    cortes: cortes
  });
};*/

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
          <View style={styles.bloqueCorte}>
            <View style={styles.headerCorte}>
              <Text style={styles.nombreCorte}>{item.nombre}</Text>
              <Text style={styles.porcentajeCorte}>
                {item.ponderacion ?? item.valor ?? 'Sin peso'}%
              </Text>
            </View>

            <View style={styles.notaContainer}>
              <Text style={styles.notaLabel}>Nota promedio:</Text>
              <Text style={styles.notaValor}>
                0.0
              </Text>
            </View>

            <TouchableOpacity
              style={styles.botonDetalle}
              onPress={() =>
                navigation.navigate('EvaluacionesPorCorte', {
                  materia: materia,
                  corte: item,
                })
              }
            >
              <Text style={styles.textoBotonDetalle}>Ver detalles</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.vacio}>
            <Text style={styles.mensajeVacio}>No hay cortes registrados.</Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <View style={styles.footer}>
        <View style={styles.promedioContainer}>
          <Text style={styles.promedioLabel}>Promedio Materia:</Text>
        </View>

        <View style={styles.botonesContainer}>
          {/*
          <TouchableOpacity
            style={styles.botonPredecir}
            onPress={handlePredecir}
          >
            <Text style={styles.textoBoton}>Predecir siguiente corte</Text>
          </TouchableOpacity>
          */}

          <TouchableOpacity
            style={styles.botonAgregar}
            onPress={handleAgregarCorte}
          >
            <Text style={styles.textoBoton}>Agregar Corte</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// 💡 Asegúrate de tener definido styles correctamente como antes


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#eeeeee',
  },
  buscador: {
    height: 40,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 16,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  bloqueCorte: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerCorte: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  nombreCorte: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  porcentajeCorte: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c3e50',
    backgroundColor: '#f0f7ff',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  notaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  notaLabel: {
    fontSize: 16,
    color: '#666',
    marginRight: 8,
  },
  notaValor: {
    fontSize: 18,
    fontWeight: '700',
    color: '#27ae60',
    minWidth: 50,
    textAlign: 'right',
  },
  botonDetalle: {
    backgroundColor: '#e8f4f8',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotonDetalle: {
    color: '#3498db',
    fontWeight: '600',
  },
  vacio: {
    alignItems: 'center',
    marginTop: 40,
  },
  mensajeVacio: {
    fontSize: 16,
    color: '#95a5a6',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  promedioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  promedioLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  promedioValor: {
    fontSize: 20,
    fontWeight: '700',
    color: '#e74c3c',
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  botonPredecir: {
    flex: 1,
    backgroundColor: '#9b59b6',
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botonAgregar: {
    flex: 1,
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});