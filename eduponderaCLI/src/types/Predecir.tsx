import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from './navigation';

type RouteParams = RouteProp<RootStackParamList, 'Predecir'>;

const Predecir = () => {
  const route = useRoute<RouteParams>();
  const { corte } = route.params;

  const totalPonderacion = corte.evaluaciones.reduce((sum, ev) => sum + ev.valor, 0);
  const ultima = corte.evaluaciones[corte.evaluaciones.length - 1];

  const notaNecesaria = totalPonderacion < 100
    ? ((100 - totalPonderacion) / (ultima?.valor || 1)) * 5
    : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Predicción de Nota</Text>
      {ultima ? (
        <Text style={styles.texto}>
          Para alcanzar el 100% de ponderación en este corte, necesitas sacar aproximadamente:
          {'\n\n'}
          <Text style={styles.nota}>{notaNecesaria.toFixed(2)} / 5</Text> en la última evaluación: <Text style={styles.nombre}>{ultima.nombre}</Text>
        </Text>
      ) : (
        <Text>No hay evaluaciones disponibles.</Text>
      )}
    </View>
  );
};

export default Predecir;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  texto: {
    fontSize: 16,
    textAlign: 'center',
  },
  nota: {
    fontSize: 24,
    color: 'green',
    fontWeight: 'bold',
  },
  nombre: {
    fontWeight: '600',
  },
});
