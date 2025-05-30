import React, { useState } from 'react';
import { View, Text, Modal, Button, StyleSheet } from 'react-native';
import RegistroMateria from './RegistroMateria';
import VistaMaterias from './VistaMateria';
import { Materia } from '../types';

interface BienvenidaProps {
  onMateriasActualizadas?: (materias: Materia[]) => void;
}

export default function Bienvenida({ onMateriasActualizadas }: BienvenidaProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [materias, setMaterias] = useState<Materia[]>([]);

  const handleAgregarMateria = () => {
    setIsModalOpen(true);
  };

  const handleMateriaAgregada = (nuevaMateria: Materia) => {
    const nuevasMaterias = [...materias, nuevaMateria];
    setMaterias(nuevasMaterias);
    onMateriasActualizadas?.(nuevasMaterias);
    setIsModalOpen(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bienvenido Estudiante</Text>
      <Text style={styles.mensaje}>
        Agrega aquí tus materias para que podamos ayudarte a generar tu promedio actual y tu proyección deseada.
      </Text>

      <VistaMaterias
        materias={materias}
        onAgregar={handleAgregarMateria}
        onSeleccionar={(materia) => console.log('Seleccionada:', materia)}
      />

      <Modal visible={isModalOpen} animationType="slide">
        <View style={styles.modalContent}>
          <RegistroMateria onMateriaAgregada={handleMateriaAgregada} />
          <Button title="Cerrar" onPress={() => setIsModalOpen(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  mensaje: { fontSize: 16, marginBottom: 20 },
  modalContent: { flex: 1, padding: 16, justifyContent: 'center' },
});
