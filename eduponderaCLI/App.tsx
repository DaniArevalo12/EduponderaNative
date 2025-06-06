import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
enableScreens();

import Bienvenida from './src/types/Bienvenida';
import RegistroMateria from './src/types/RegistroMateria';
import VistaMateria from './src/types/VistaMateria';
import VistaMateriaDetalle from './src/types/VistaMateriaDetalle';
import CrearCorte from './src/types/CrearCorte';
import EvaluacionCorte from './src/types/EvaluacionCorte';
import EvaluacionesPorCorte from './src/types/EvaluacionCorte';
import Predecir from './src/types/Predecir';

import { RootStackParamList } from './src/types/navigation';
import { Materia } from './src/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [materias, setMaterias] = useState<Materia[]>([]);

  const agregarMateria = (materia: Materia) => {
    setMaterias((prev) => [...prev, materia]);
  };

  const actualizarMaterias = (nuevas: Materia[]) => {
    setMaterias(nuevas);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Bienvenida">
        <Stack.Screen name="Bienvenida" options={{ headerShown: false }}>
          {(props) => (
            <Bienvenida
              {...props}
              onMateriasActualizadas={actualizarMaterias}
              materias={materias}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="VistaMateria">
          {(props) => (
            <VistaMateria
              {...props}
              materias={materias}
              onAgregar={() => {}}
              onSeleccionar={(materia) => {
                props.navigation.navigate('VistaMateriaDetalle', {
                  materia,
                  cortes: materia.cortes ?? [],
                });
              }}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="VistaMateriaDetalle" component={VistaMateriaDetalle} />
        <Stack.Screen name="RegistroMateria">
          {(props) => (
            <RegistroMateria
              {...props}
              onMateriaAgregada={agregarMateria}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="CrearCorte" component={CrearCorte} />
        <Stack.Screen name="EvaluacionesPorCorte" component={EvaluacionesPorCorte} />
        <Stack.Screen name="Predecir" component={Predecir} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
