export interface Materia {
  id: string;
  nombre: string;
  color?: string;
  fondo?: string;
  nota?: number;
  porcentaje?: number;
}
export interface Corte {
  id: string;
  nombre: string;
  descripcion: string;
  materiaId: string; // Para saber a qué materia pertenece
}export type RootStackParamList = {
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
    cortes: any[];
  };
};

