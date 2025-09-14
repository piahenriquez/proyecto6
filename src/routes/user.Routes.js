const express = require('express');
const router = express.Router();
const auth = require('../middleware/authorization');
const {createUser, login, verifyUser, getUserById} = require('../controllers/user.Controller');


// Ruta para crear un nuevo usuario
router.post('/register', createUser);

// Ruta para iniciar sesión
router.post('/login', login);

// Ruta protegida para verificar el token
router.get('/verify', auth, verifyUser);

router.get("/:id", auth, getUserById);


module.exports = router;