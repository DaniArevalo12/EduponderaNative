import { Materia, Corte } from '../types';

export type RootStackParamList = {
  Bienvenida: undefined;
  RegistroMateria: undefined;
  VistaMateria: undefined;
  VistaMateriaDetalle: { materia: Materia; cortes: Corte[] };
  CrearCorte: {  
   materiaId: string;nombreMateria: string;cortesActuales: Corte[];};
};