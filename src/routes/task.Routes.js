const express = require('express');
const router = express.Router();
const auth = require('../middleware/authorization');
const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
} = require('../controllers/task.Controller');

// Crear una nueva tarea
router.post('/', auth, createTask);

// Obtener todas las tareas del usuario autenticado
router.get('/', auth, getTasks);

// Obtener una tarea por su ID
router.get('/:id', auth, getTaskById);

// Actualizar una tarea por su ID
router.put('/:id', auth, updateTask);

// Eliminar una tarea por su ID
router.delete('/:id', auth, deleteTask);

module.exports = router;