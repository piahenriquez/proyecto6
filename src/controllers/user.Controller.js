const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// crear un nuevo usuario
exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const foundUser = await User.findOne({ email });
    if (foundUser)
      return res.status(400).json({ message: "El usuario ya existe" });

    
    const newUser = await User.create({
      username,
      email,
      password, 
    });
    if (!newUser)
      return res.status(400).json({ message: "Error al crear el usuario" });

    res.status(201).json({ data: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el usuario", error: error.message });
  }
};

//login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let foundUser = await User.findOne({ email });
    if (!foundUser)
      return res.status(400).json({ message: "el usuario no existe" });

    const correctPassword = await bcryptjs.compare(
      password,
      foundUser.password
    );
    if (!correctPassword)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    const payload = {
      user: {
        id: foundUser._id,
      },
    };
    //token
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "8h" });
    res.json({
      message: "Login exitoso",
      token: token,
      user: {
        id: foundUser._id,
        username: foundUser.username,
        email: foundUser.email,
      },
    });
  } catch (error) {
    return res.json({
      message: "Error al iniciar sesión",
      error: error.message,
    });
  }
};
//verificar usuario
exports.verifyUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.json({ data: user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al verificar el usuario", error: error.message });
  }
};
