const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("../utils/jwt");
const multer = require('multer');
const path = require('path');

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function enviarCorreoSendGrid(
  destinatario,
  asunto,
  contenido,
  linkToPage
) {
  const msg = {
    to: `${destinatario}`, // Cambia a tu destinatario
    from: "valentina.maring@autonoma.edu.co", // Cambia a tu remitente verificado
    subject: `${asunto}`,
    text: `${contenido}`,
    html: `<p>${contenido}</p><p>Visita nuestra página: <a href="${linkToPage}">${linkToPage}</a></p>`,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent");
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to handle it in the calling function
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../../../Proyecto-front-End/public/images/avatars'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

/* VALIDACIONES */

/* Validación del Email */
const validateEmail = (email) => {
  const emailDomain = /@(gmail\.com|outlook\.com|autonoma\.edu\.co)$/;
  return emailDomain.test(email);
};

/* Validación del Tipo de Documento */
const validateDocumentType = (documentType) => {
  const allowedDocumentTypes = [
    "Cédula de ciudadanía",
    "Cédula de extranjería",
    "Tarjeta de identidad",
    "Pasaporte",
  ];
  return allowedDocumentTypes.includes(documentType);
};

/* Validación de país.
   Validación de departamento y municipio si el país es Colombia
   Validación del state si es un país diferente a Colombia */
const validateLocationFields = (country, department, municipality, state) => {
  if (country === "Colombia") {
    if (!department || !municipality) {
      return {
        valid: false,
        message:
          "Campos de departamento, municipio o estado inválidos para Colombia",
      };
    } else if (state !== "") {
      return {
        valid: false,
        message: "El campo de State no es requerido para Colombia",
      };
    }
  } else {
    if (department || municipality) {
      return {
        valid: false,
        message:
          "Campos de departamento, municipio no son inválidos para otro país",
      };
    } else if (!state) {
      return {
        valid: false,
        message:
          "El campo de State es requerido para otro país diferente a Colombia",
      };
    }
  }
  return { valid: true };
};

/* GET información del usuario en sesión */
const getMe = async (req, res) => {
  try {
    const { user_id } = req.user;
    const response = await User.findById(user_id);
    if (!response) {
      return res.status(400).send({ msg: "No se ha encontrado usuario" });
    }
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ msg: "Error del servidor" });
  }
};

/* GET información de un usuario por su id - Leer */
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await User.findById(id);
    if (!response) {
      return res.status(400).send({ msg: "No se ha encontrado usuario" });
    }
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ msg: "Error del servidor" });
  }
};

/* GET todos los usuarios registrados en la bd - Leer */
const getUsers = async (req, res) => {
  try {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ msg: "Token de autorización no proporcionado" });
    }

    const token = authorizationHeader.split(" ")[1];
    const decodedToken = jwt.decoded(token);

    const user = await User.findById(decodedToken.user_id);

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "No tienes permiso para acceder a esta información" });
    }

    const data = await User.find({ _id: { $ne: user._id } });

    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ msg: "Error del servidor" });
  }
};

/* POST usuario en la bd - Crear */
const createUser = async (req, res) => {
  try {
    upload.single('avatar')(req, res, async function (err) {
    const userData = req.body;
    const user = new User({ ...userData });

    /* VALIDACIONES DE LOS CAMPOS DEL FORMULARIO DE USUARIO*/
    /* Validación tipo de documento */
    if (!validateDocumentType(user.document_type)) {
      return res.status(400).json({ message: "Tipo de documento inválido" });
    }
    /* Validación del país */
    const locationValidation = validateLocationFields(
      user.country,
      user.department,
      user.municipality,
      user.state
    );
    if (!locationValidation.valid) {
      return res.status(400).json({ message: locationValidation.message });
    }
    /* Validación del email */
    if (!user.email) {
      return res.status(400).send({ msg: "El email es requerido" });
    } else if (!validateEmail(user.email)) {
      return res
        .status(400)
        .json({ message: "El correo electrónico no es válido" });
    }
    /* Validación de contraseña */
    if (!user.password) {
      return res.status(400).send({ msg: "La contraseña es requerida" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    user.password = hashedPassword;

    if (req.file) {
      user.avatar = req.file.filename;
    }

    const userStored = await user.save();
    res.status(201).send(userStored);
  });
  } catch (error) {
    res.status(400).send(error);
  }
};

/* PUT/PATCH usuarios por su id - Editar */
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;

    if (userData.password) {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(userData.password, salt);
      userData.password = hashPassword;
    } else {
      delete userData.password;
    }

    if (req.files && req.files.avatar) {
      const imagePath = image.getFilePath(req.files.avatar);
      userData.avatar = imagePath;
    }

    await User.findByIdAndUpdate({ _id: id }, userData);

    res.status(200).send({ msg: "Actualización correcta" });
  } catch (error) {
    res.status(400).send({ msg: "Error al actualizar el usuario" });
  }
};

/* DELETE usuario por su id - Eliminar */
/* DELETE usuario por su id - Eliminar */
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send({ msg: "Usuario no encontrado" });
    }

    if (user.role === "user") {
      await User.findByIdAndDelete(id);
      return res.status(200).send({ msg: "Usuario eliminado" });
    } else {
      return res.status(403).send({ msg: "No tienes permisos para eliminar este usuario" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error al eliminar el usuario" });
  }
};


const resetPasswordEmail = async (req, res) => {
  try {
    console.log(req.body);
    const { email } = req.body;
    console.log(email);
    const usuario = await User.findOne({ email });
    console.log(usuario);

    if (!usuario) {
      return res
        .status(404)
        .json({ msg: "Usuario no registrado en el sistema" });
    }

    if (!usuario.active) {
      return res.status(400).json({ msg: "Usuario no activo en el sistema" });
    }

    const token = jwt.createAccessTokenResetPassword(usuario);

    const asunto = "Restablecer contraseña - Cambia tu contraseña";
    const linkToResetPage = `http://localhost:3000/reset-password?token=${token}`;
    const contenido = `Hemos recibido una solicitud para restablecer tu contraseña. Haz clic en el siguiente enlace para cambiar tu contraseña: ${linkToResetPage}. Este enlace caducará en 1 hora.`;

    await enviarCorreoSendGrid(email, asunto, contenido, linkToResetPage);

    res
      .status(200)
      .json({
        msg: "Correo de restablecimiento de contraseña enviado exitosamente",
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ msg: "Token de autorización no proporcionado" });
    }

    const token = authorizationHeader.split(" ")[1];
    const decodedToken = jwt.decoded(token);

    const usuario = await User.findById(decodedToken.user_id);

    if (!usuario) {
      return res
        .status(404)
        .json({ msg: "Usuario no registrado en el sistema" });
    }

    console.log(req.body.password);
    const hashedContraseña = await bcrypt.hash(req.body.password, 10);

    usuario.password = hashedContraseña;
    await usuario.save();

    console.log(usuario);

    console.log("Contraseña actualizada con éxito");
    res.status(200).json({ msg: "Contraseña actualizada con éxito" });
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error.message);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

const changePassword = async (req, res) => {
  try {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ msg: "Token de autorización no proporcionado" });
    }

    const token = authorizationHeader.split(" ")[1];
    const decodedToken = jwt.decoded(token);

    const usuario = await User.findById(decodedToken.user_id);

    if (!usuario) {
      return res
        .status(404)
        .json({ msg: "Usuario no registrado en el sistema" });
    }

    console.log(usuario);
    console.log(req.body.oldpassword);

    const isPasswordCorrect = await bcrypt.compare(req.body.oldpassword, usuario.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: 'Contraseña actual incorrecta' });
    }

    const newHashedPassword = await bcrypt.hash(req.body.newpassword, 10);
    console.log(req.body.newpassword);

    usuario.password = newHashedPassword;
    await usuario.save();

    console.log(usuario);

    return res.status(200).json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const changeActiveUser = async (req, res) => {
  try {
    console.log(req.body.userId)
    const document = req.body.userId
    const usuario = await User.findOne({ document });

    const newActiveValue = req.body.active;  

    const updateFields = {};

    if (newActiveValue !== undefined) {
      updateFields.active = newActiveValue;
    }

    await User.updateOne({ _id: usuario._id }, updateFields);

    res.status(200).send({ msg: "Actualización correcta" });
  } catch (error) {
    res.status(400).send({ msg: "Error al actualizar el estado del usuario" });
  }
};

module.exports = {
  getMe,
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  resetPasswordEmail,
  resetPassword,
  changePassword,
  changeActiveUser,
};
