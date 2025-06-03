export interface Corte {
  id: string;
  nombre: string;
  descripcion: string;
  materiaId: string;
  porcentaje: number;
  ponderacion: number;
}

export interface Materia {
  id: string;
  nombre: string;
  color?: string;
  fondo?: string;
  descripcion?: string;
  nota?: number;
  porcentaje?: number;
  cortes?: Corte[];
}

// Define RootStackParamList separately, do NOT put interfaces inside it.
export type RootStackParamList = {
  Bienvenida: undefined;
  Materias: {
    materias: Materia[];
    onSeleccionarMateria: (materia: Materia) => void;
  };
  RegistroMateria: {
    onMateriaAgregada: (materia: Materia) => void;
  };
  VistaMateriaDetalle: {
    materia: Materia;
    cortes: Corte[];
  };
  VistaMateria: { materiaId: string };
  CrearCorte: { materiaId: string };
};