const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }

  try {
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(409).json({ message: "El email ya está registrado" });
    }

    const newUser = await User.create({ username, email, password });

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      data: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "El username o email ya está en uso" });
    }
    return res.status(500).json({ message: "Error al registrar el usuario" });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email y password son requeridos" });
  }

  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const correctPassword = await bcryptjs.compare(password, foundUser.password);
    if (!correctPassword) {
      return res.status(401).json({ message: "email o contraseña incorrecta" });
    }

    const payload = { user: { id: foundUser._id } };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "8h" });

    res.json({
      message: "Sesión iniciada correctamente",
      token,
      user: {
        id: foundUser._id,
        username: foundUser.username,
        email: foundUser.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

// Verificar usuario
exports.verifyUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({
      message: "Token válido",
      data: user
    });
  } catch (error) {
    res.status(500).json({ message: "Error al verificar token" });
  }
};
// obtener usuario por id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario encontrado", data: user });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuario" });
  }
};
//actualizar usuario
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario actualizado correctamente", data: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
};

