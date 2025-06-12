import { Materia, Corte } from '.';

export type RootStackParamList = {
  Bienvenida: undefined;
  RegistroMateria: undefined;
  VistaMateria: undefined;
  VistaMateriaDetalle: { materia: Materia; cortes: Corte[] };
  CrearCorte: {  
    materiaId: string;
    nombreMateria: string;
    cortesActuales: Corte[];
    onCorteAgregado: (nuevoCorte: Corte) => void;
  };
  EvaluacionesPorCorte: {
    materia: Materia;
    corte: Corte;
  };

  Predecir: {
  corte: Corte;
};



};