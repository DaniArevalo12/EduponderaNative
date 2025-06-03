import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
enableScreens();

import Bienvenida from './src/types/Bienvenida';
import RegistroMateria from './src/types/RegistroMateria';
import VistaMateria from './src/types/VistaMateria';
import VistaMateriaDetalle from './src/types/VistaMateriaDetalle';
import { RootStackParamList } from './src/types/navigation';
import { Materia } from './src/types';

const Stack = createNativeStackNavigator();

export default function App() {
  const [materias, setMaterias] = useState<Materia[]>([]);

  const agregarMateria = (materia: Materia) => {
    setMaterias((prev) => [...prev, materia]);
  };

  const actualizarMaterias = (nuevas: Materia[]) => {
    setMaterias(nuevas);
  };

  const seleccionarMateria = (materia: Materia) => {
    // Navega a VistaMateriaDetalle pasando materia y cortes como params
    // Si usas navigation aquí, pásalo como prop o usa un callback en VistaMateria
    // Ejemplo: navigation.navigate('VistaMateriaDetalle', { materia, cortes: materia.cortes ?? [] });.
    console.log('Seleccionada:', materia);
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
                // Aquí navega correctamente a VistaMateriaDetalle
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}