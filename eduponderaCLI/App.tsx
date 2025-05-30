import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
enableScreens(); // Mejora el rendimiento y evita este tipo de errores
import Bienvenida from './src/types/Bienvenida';
import Materias from './src/types/VistaMateriaDetalle';
import RegistroMateria from './src/types/RegistroMateria';
import VistaMateria from './src/types/VistaMateria';
import { Materia } from './src/types';

export default function App() {
  const [materias, setMaterias] = useState<Materia[]>([]);

  const agregarMateria = (materia: Materia) => {
    setMaterias((prev) => [...prev, materia]);
  };

  const actualizarMaterias = (nuevas: Materia[]) => {
    setMaterias(nuevas);
  };

  const seleccionarMateria = (materia: Materia) => {
    console.log('Seleccionada:', materia);
  };

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Bienvenida">
        <Stack.Screen name="Bienvenida">
          {(props) => (
            <Bienvenida
              {...props}
              onMateriasActualizadas={actualizarMaterias}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Materias">
          {(props) => <Materias {...props} materias={materias} />}
        </Stack.Screen>
        <Stack.Screen name="RegistroMateria">
          {(props) => (
            <RegistroMateria
              {...props}
              onMateriaAgregada={agregarMateria}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="VistaMateria">
          {(props) => (
            <VistaMateria
              {...props}
              materias={materias}
              onAgregar={() => {}}
              onSeleccionar={seleccionarMateria}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
