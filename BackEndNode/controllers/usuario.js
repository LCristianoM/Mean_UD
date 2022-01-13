const errorResponse = require("../helper/error.response");
const Usuario = require("../models/Usuario");

exports.registrarUsuario = async (req, res, next) => {
  // res.status(200).json({status: 200});

  try {
    const { nombre, apellido, nick, email, password } = req.body;
    const usrBD = await Usuario.create({
      nombre,
      apellido,
      nick,
      email,
      password,
    });

    const token = usrBD.crearJsonWebToken();

    res.status(200).json({
      status: 200,
      id: usrBD._id,
      nombre,
      apellido,
      nick,
      email,
      token,
    });
  } catch (err) {
    next(new errorResponse("Error al registrar usuario" + err, 400));
  }
};

exports.login = async (req, res, next) => {
  // res.status(200).json({status: 200});

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(
        new errorResponse("Ingrese un email y un password", 400)
        );
    }
    const usuarioBD = await Usuario.findOne({ email }).select("+password");

    if (!usuarioBD) {
      return next(
        new errorResponse("el usuario no existe en la base de datos", 400)
      );
    }

    const valorBool = await usuarioBD.validarPassword(password);
    if (!valorBool) {
      return next(new errorResponse("las credenciales son incorrectas", 400));
    }

    const token = usuarioBD.crearJsonWebToken();

        res.status(200).json({
        status: 200,
        id: usuarioBD._id,
        nombre: usuarioBD.nombre,
        apellido: usuarioBD.apellido,
        nick: usuarioBD.nick,
        email: usuarioBD.email,
        token,
        });
  } catch (err) {
        next(
          new errorResponse("Error en el login" + err, 400)
        );
    }
};

    exports.getUsuario = async (req, res, next) => {
    // res.status(200).json({ status: 200 });
    try {
        const usuarioToken = req.usuario;
        const token = await usuarioToken.crearJsonWebToken;
        res.status(200).json({
        status: 200,
        id: usuarioToken._id,
        nombre: usuarioToken.nombre,
        apellido: usuarioToken.apellido,
        nick: usuarioToken.nick,
        email: usuarioToken.email,
        token
        });
    } catch (err) {
        next(new errorResponse("Error obteniendo la sesion del usuario" + err, 400));
    }
};
