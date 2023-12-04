const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("../utils/jwt");

const twilio = require("twilio");
const accountSID = "ACca3cfefebd45aa319ed2a5760342039c";
const authToken = "60b53ea71d16e91723dbca934a6bcefa";
const client = new twilio(accountSID, authToken);

async function enviarSMSTwilio(destinatario, cuerpo) {
  try {
    await client.messages.create({
      to: "+573184369690",
      from: "+13603694608",
      body: `${cuerpo}`,
    });
    console.log("Mensaje SMS enviado");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

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
    throw error;
  }
}

async function accountActivation(user) {
  try {
    const token = jwt.createAccessTokenResetPassword(user);

    const asunto = "Activación de tu cuenta";
    const linkToResetPage = `http://localhost:3000/activation?token=${token}`;
    const contenido = `Activa tu cuenta. Haz clic en el siguiente enlace para activar tu cuenta: ${linkToResetPage}. Este enlace caducará en 1 hora.`;

    await enviarCorreoSendGrid(user.email, asunto, contenido, linkToResetPage);
    console.log("Enviado correo de activación");
    await enviarSMSTwilio(user.phone_number, contenido);
    console.log("Enviado SMS de activación");
  } catch (error) {
    console.error(error);
  }
}

/* VALIDACIONES */

/* Validación del Email */
const validateEmail = (email) => {
  const emailDomain = /@(gmail|outlook)\.com$/;
  return emailDomain.test(email);
};

/* Validación del Tipo de Documento */
const validateDocumentType = (documentType) => {
  const allowedDocumentTypes = [
    "Cédula de ciudadanía",
    "Cédula extranjera",
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

const register = async (req, res) => {
  const {
    firstname,
    lastname,
    country,
    department,
    municipality,
    state,
    document_type,
    document,
    email,
    password,
    avatar,
  } = req.body;

  try {
    /* VALIDACIONES DE LOS CAMPOS DEL FORMULARIO DE USUARIO*/
    /* Validación tipo de documento */
    if (!validateDocumentType(document_type)) {
      return res.status(400).json({ message: "Tipo de documento inválido" });
    }
    /* Validación del país */
    const locationValidation = validateLocationFields(
      country,
      department,
      municipality,
      state
    );
    if (!locationValidation.valid) {
      return res.status(400).json({ message: locationValidation.message });
    }
    /* Validación del email */
    if (!email) {
      return res.status(400).send({ msg: "El email es requerido" });
    } else if (!validateEmail(email)) {
      return res
        .status(400)
        .json({ message: "El dominio de correo electrónico no es válido" });
    }
    /* Validación de contraseña */
    if (!password) {
      return res.status(400).send({ msg: "La contraseña es requerida" });
    }

    /* Generar el hash de la contraseña */
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    /* Crear un nuevo usuario con los datos del request body del API */
    const newUser = new User({
      firstname,
      lastname,
      country,
      department,
      municipality,
      state,
      document_type,
      document,
      email: email.toLowerCase(),
      password: hashPassword,
      avatar,
    });

    /* Guardar el usuario en la bd */
    const userStorage = await newUser.save();
    await accountActivation(userStorage);
    res.status(201).send(userStorage);
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res.status(400).send({ msg: "Error al crear el usuario" });
  }
};

/* Función para iniciar sesión */
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .send({ msg: "El email y la contraseña son obligatorios" });
    }
    const emailLowerCase = email.toLowerCase();
    const userStore = await User.findOne({ email: emailLowerCase }).exec();
    if (!userStore) {
      return res.status(404).send({ msg: "El usuario no existe" });
    }
    const check = await bcrypt.compare(password, userStore.password);
    if (!check) {
      return res.status(400).send({ msg: "Contraseña incorrecta" });
    }

    res.status(200).send({
      access: jwt.createAccessToken(userStore),
      refresh: jwt.createRefreshToken(userStore),
    });
  } catch (error) {
    console.error("Error del servidor:", error);
    return res.status(500).send({ msg: "Error del servidor" });
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).send({ msg: "Token requerido" });
    }
    const { user_id } = jwt.decoded(token);
    const userStorage = await User.findOne({ _id: user_id });
    /* Generar nuevo token de acceso */
    const accessToken = jwt.createAccessToken(userStorage);
    return res.status(200).send({ accessToken });
  } catch (error) {
    console.error("Error del servidor:", error);
    return res.status(500).send({ msg: "Error del servidor" });
  }
};

const activationAccount = async (req, res) => {
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

    usuario.active = true;
    await usuario.save();

    console.log(usuario);

    console.log("Usuario activo");
    return res.status(200).json({ msg: "Usuario activo en el sistema" });
  } catch (error) {
    console.error("Error al activar el usuario:", error.message);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

module.exports = {
  register,
  login,
  refreshAccessToken,
  activationAccount,
};
