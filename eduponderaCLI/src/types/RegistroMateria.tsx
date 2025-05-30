import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Materia } from '../types';

// Define tus tipos de rutas para navegación si usas TypeScript
type RootStackParamList = {
  VistaMateriaDetalle: { materia: Materia; cortes: any[] };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const colores = ['#A0A0A0', '#A7C7FF', '#FFAFAF', '#B0FFAA', '#E7A7FF', '#FFD27F'];

interface RegistroMateriaProps {
  onMateriaAgregada: (materia: Materia) => void;
}

export default function RegistroMateria({ onMateriaAgregada }: RegistroMateriaProps) {
  const [nombre, setNombre] = useState('');
  const [colorSeleccionado, setColorSeleccionado] = useState<string | null>(null);
  const [imagenFondo, setImagenFondo] = useState<string | null>(null);

  const navigation = useNavigation<NavigationProp>();

  const handleSeleccionarImagen = async () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImagenFondo(response.assets[0].uri || null);
      }
    });
  };

  const handleAgregar = () => {
    if (!nombre) return;

    const nuevaMateria: Materia = {
      id: Date.now().toString(),
      nombre,
      color: colorSeleccionado ?? undefined,
      fondo: imagenFondo ?? undefined,
    };

    onMateriaAgregada(nuevaMateria);

    navigation.navigate('VistaMateriaDetalle', {
      materia: nuevaMateria,
      cortes: [],
    });

    setNombre('');
    setColorSeleccionado(null);
    setImagenFondo(null);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>Registre su materia</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Colores:</Text>
      <View style={styles.coloresContainer}>
        {colores.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.color,
              { backgroundColor: color },
              color === colorSeleccionado && styles.colorSeleccionado,
            ]}
            onPress={() => setColorSeleccionado(color)}
          />
        ))}
      </View>

      <Text style={styles.label}>Cargar fondo:</Text>
      <TouchableOpacity style={styles.botonCargar} onPress={handleSeleccionarImagen}>
        <Text style={styles.botonTexto}>📷 Subir imagen</Text>
      </TouchableOpacity>

      {imagenFondo && <Image source={{ uri: imagenFondo }} style={styles.previewImagen} />}

      <TouchableOpacity
        style={[styles.boton, { opacity: nombre ? 1 : 0.5 }]}
        disabled={!nombre}
        onPress={handleAgregar}
      >
        <Text style={styles.botonTexto}>Agregar Materia</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#aaa',
    backgroundColor: '#fff',
    marginVertical: 20,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    padding: 8,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  coloresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
    gap: 10,
  },
  color: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
    marginBottom: 8,
  },
  colorSeleccionado: {
    borderColor: '#000',
    borderWidth: 2,
  },
  botonCargar: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  previewImagen: {
    width: '100%',
    height: 100,
    marginBottom: 10,
    borderRadius: 8,
  },
  boton: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});