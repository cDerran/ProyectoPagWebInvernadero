export interface UsuarioData {
    nombre?: string;
    apellido?: string;
    direccion?: string;
    telefono?: string;
    tipoUsuario?: string;
    email?: string; // Opcional, ya que no siempre se actualiza
    password?: string; // Opcional, por las mismas razones
  }