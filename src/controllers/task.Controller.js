const Task = require('../models/taskModel');

// Crear una nueva tarea
exports.createTask = async (req, res) => {
    const { title, description, completed } = req.body;
    try {
        const newTask = await Task.create({
            title,
            description,
            completed: completed || false,
            user: req.user.id, // Asociar la tarea al usuario autenticado
        });
        
        if (!newTask) 
            return res.status(400).json({ message: 'Error al crear la tarea' });

        return res.status(201).json({ data: newTask });
    } catch (error) {
         return res.status(500).json({ message: "hubo un error al crear la tarea", error: error.message });
    }
};

//obtener las tareas 
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        return res.json({ data: tasks });
    } catch (error) {
        return res.status(500).json({ message: "hubo un error al obtener las tareas", error: error.message });
    }
};
// Obtener una sola tarea
exports.getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findOne({ _id: id, user: req.user.id });
        if (!task)
            return res.status(404).json({ message: "tarea no encontrada" });

        return res.json({ data: task });
    } catch (error) {
        return res.status(500).json({ message: "hubo un error al obtener la tarea", error: error.message });
    }
};

// Actualizar tarea
exports.updateTask = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedTask = await Task.findOneAndUpdate(
            { _id: id, user: req.user.id },
            req.body,
            { new: true }
        );

        if (!updatedTask)
            return res.status(404).json({ message: "tarea no encontrada" });

        return res.json({ data: updatedTask });
    } catch (error) {
        return res.status(500).json({ message: "hubo un error al actualizar la tarea", error: error.message });
    }
};

// Eliminar tarea
exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await Task.findOneAndDelete({ _id: id, user: req.user.id });
        if (!deletedTask)
            return res.status(404).json({ message: "tarea no encontrada" });

        return res.json({ message: "tarea eliminada correctamente", data: deletedTask });
    } catch (error) {
        return res.status(500).json({ message: "hubo un error al eliminar la tarea", error: error.message });
    }
};