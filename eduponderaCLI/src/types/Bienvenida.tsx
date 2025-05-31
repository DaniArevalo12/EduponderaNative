import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, Image, TouchableOpacity } from 'react-native';
import RegistroMateria from './RegistroMateria';
import VistaMaterias from './VistaMateria';
import { Materia } from '../types';

// Define the props type to accept props from App.tsx
type BienvenidaProps = {
  onMateriasActualizadas: (nuevas: Materia[]) => void;
  navigation: any;
  route: any;
};

const Bienvenida: React.FC<BienvenidaProps> = ({ onMateriasActualizadas }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [materias, setMaterias] = useState<Materia[]>([]);

  const handleAgregarMateria = () => {
    setIsModalOpen(true);
  };

  const handleMateriaAgregada = (nuevaMateria: Materia) => {
    const nuevasMaterias = [...materias, nuevaMateria];
    setMaterias(nuevasMaterias);
    setIsModalOpen(false);
    // Notifica al componente padre (App) sobre el cambio
    onMateriasActualizadas(nuevasMaterias);
  };

  return (
    <View style={styles.container}>
      {materias.length === 0 ? (
        <>
          <Text style={styles.titulo}>Bienvenido Estudiante</Text>
          <Image
            source={require('../../src/assets/logoEdupondera.jpg')}
            style={styles.logo}
            resizeMode="contain"
          />
          <TouchableOpacity style={styles.botonAgregarPrincipal} onPress={handleAgregarMateria}>
            <Text style={styles.botonTexto}>➕</Text>
          </TouchableOpacity>
          <Text style={styles.mensaje}>
            Agrega aquí tus materias para que podamos ayudarte a generar tu promedio actual y tu proyección deseada.
          </Text>
        </>
      ) : (
        <>
          <VistaMaterias
            materias={materias}
            onAgregar={handleAgregarMateria}
            onSeleccionar={(materia) => console.log('Seleccionada:', materia)}
          />
          <TouchableOpacity style={styles.botonFlotante} onPress={handleAgregarMateria}>
            <Text style={styles.botonTexto}>➕</Text>
          </TouchableOpacity>
        </>
      )}

      <Modal visible={isModalOpen} animationType="slide">
        <View style={styles.modalContent}>
          <RegistroMateria onMateriaAgregada={handleMateriaAgregada} />
          <TouchableOpacity onPress={() => setIsModalOpen(false)}>
            <Text style={styles.cerrarModal}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Bienvenida;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  logo: {
    width: 200,
    height: 180,
    marginVertical: 20,
    alignSelf: 'center',
  },
  mensaje: {
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 20,
    color: '#333',
    marginTop: 10,
  },
  botonAgregarPrincipal: {
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 10,
  },
  botonTexto: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  botonFlotante: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    zIndex: 100,
  },
  modalContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  cerrarModal: {
    textAlign: 'center',
    color: 'blue',
    marginTop: 10,
    fontSize: 16,
  },
});