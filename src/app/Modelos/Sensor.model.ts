export interface LecturaSensor {
  FechaHora: string; 
  Temperatura: number;
  Humedad: number;
}
export interface Control {
  Temperatura: {
    Min: number;
    Max: number;
  };
  Humedad: {
    Min: number;
    Max: number;
  };
}
export interface Sensor {
  id: string;
  Nombre: string;
  Tipo: string;
  Ubicacion: string;
  Lecturas: { [key: string]: LecturaSensor }; 
  ultimaLectura: LecturaSensor | null;
  Control: Control;
}
