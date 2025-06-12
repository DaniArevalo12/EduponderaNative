import React, { createContext, useState, useContext } from 'react';

type Evaluacion = {
  nombre: string;
  valor: number;
  nota: number;
};

type Corte = {
  id: string;
  nombre: string;
  peso: number;
  evaluaciones: Evaluacion[];
};

type Materia = {
  id: string;
  nombre: string;
  cortes: Corte[];
};

type AppData = {
  materias: Materia[];
  agregarMateria: (materia: Materia) => void;
  actualizarMateria: (materia: Materia) => void;
};

const AppDataContext = createContext<AppData | undefined>(undefined);

export const AppDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [materias, setMaterias] = useState<Materia[]>([]);

  const agregarMateria = (materia: Materia) => {
    setMaterias(prev => [...prev, materia]);
  };

  const actualizarMateria = (materia: Materia) => {
    setMaterias(prev =>
      prev.map(m => (m.id === materia.id ? materia : m))
    );
  };

  return (
    <AppDataContext.Provider value={{ materias, agregarMateria, actualizarMateria }}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData debe usarse dentro de AppDataProvider');
  }
  return context;
};
