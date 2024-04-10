export interface UsuarioData {
    uid?: string;
    nombre?: string;
    apellido?: string;
    direccion?: string;
    telefono?: string;
    Tipo?: string;
    email?: string; // Opcional, ya que no siempre se actualiza
    password?: string; // Opcional, por las mismas razones
    Sensores?:  { [key: string]: boolean };
    selectedSensors?: { [key: string]: boolean };
  }
