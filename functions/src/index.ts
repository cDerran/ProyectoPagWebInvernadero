import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

type DatosAuth = {
  email?: string;
  password?: string;
};

exports.eliminarUsuario = functions.https.onCall(async (data, context) => {
  // Verifica si el usuario que llama a la función es un administrador
  if (!context.auth?.token.admin) {
    throw new functions.https.HttpsError(
      "permission-denied",
      "La operación requiere privilegios de administrador."
    );
  }

  const {userId, tipoUsuario} = data;

  try {
    await admin.auth().deleteUser(userId);
    const dbPath=`Usuarios/${tipoUsuario==="Administrador"?
      "Administradores":"Clientes"}/${userId}`;
    await admin.database().ref(dbPath).remove();
    return {
      success: true,
      message: "Usuario eliminado con éxito: ",
    };
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Error"// Error al eliminar el usuario
    );
  }
});

exports.registrarUsuarioConRol=functions.https.onCall(
  async (data) => {
  // Extraer la información del usuario desde los datos proporcionados
    const {
      email,
      password,
      nombre,
      apellido,
      direccion,
      telefono,
      tipoUsuario,
    } = data;

    // Crear el usuario en Firebase Authentication
    let userRecord;
    try {
      userRecord = await admin.auth().createUser({
        email,
        password,
      });
    } catch (error) {
      console.error("Error al crear el usuario en Auth:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Error al crear el usuario en Authentication."
      );
    }
    const claims = tipoUsuario === "Administrador" ? {admin: true} : {};
    await admin.auth().setCustomUserClaims(
      userRecord.uid,
      claims);

    const userInfo={nombre, apellido, direccion, telefono, email,
      Tipo: tipoUsuario, password};
    const dbPath=
    `Usuarios/${tipoUsuario===
      "Administrador"?"Administradores":"Clientes"}/${userRecord.uid}`;
    await admin.database().ref(dbPath).set(userInfo);

    return {
      success: true,
      message: `Usuario ${tipoUsuario} registrado con éxito.`,
      uid: userRecord.uid};
  });

exports.actualizarUsuario = functions.https.onCall(async (data, context) => {
  if (!context.auth?.token.admin) {
    throw new functions.https.HttpsError("unauthenticated",
      "Solo los administradores pueden realizar esta operación.");
  }
  const {
    uid,
    email,
    password,
    tipoUsuario,
    nombre,
    apellido,
    direccion,
    telefono} = data;

  try {
    const authUpdate: DatosAuth = {};
    if (email) authUpdate.email = email;
    if (password) authUpdate.password = password;

    if (Object.keys(authUpdate).length > 0) {
      await admin.auth().updateUser(uid, authUpdate);
    }
    const nodoBase=tipoUsuario==="Administrador"?"Administradores":"Clientes";
    const dbPath = `Usuarios/${nodoBase}/${uid}`;
    const datosDB = {
      nombre,
      apellido,
      direccion,
      telefono,
      tipoUsuario,
      ...(email && {email}),
      ...(password && {password})};
    if (email) datosDB.email = email;
    if (password) datosDB.password = password;
    await admin.database().ref(dbPath).update(datosDB);
    return {success: true, message: "Usuario actualizado con éxito.", uid};
  } catch (error) {
    // Manejo de errores
    if (error instanceof Error) {
      throw new functions.https.HttpsError("unknown", error.message);
    } else {
      throw new functions.https.HttpsError(
        "unknown",
        "Ocurrió un error desconocido");
    }
  }
});
