const Task = require('../models/taskModel');

// Crear una nueva tarea
exports.createTask = async (req, res) => {
    const { title, description, completed } = req.body;

    try {
        if (!title || title.trim() === "") {
            return res.status(400).json({ message: "El título es obligatorio" });
        }

        const normalizedTitle = title.trim().toLowerCase();

        // Evitar tareas duplicadas
        const existingTask = await Task.findOne({ title: normalizedTitle, user: req.user.id });
        if (existingTask) {
            return res.status(400).json({ message: "Ya existe una tarea con ese título" });
        }

        const newTask = await Task.create({
            title: normalizedTitle,
            description: description || "",
            completed: completed || false,
            user: req.user.id,
        });

        return res.status(201).json({
            message: "Tarea creada exitosamente",
            data: newTask
        });
    } catch (error) {
        return res.status(500).json({ message: "Hubo un error al crear la tarea", error: error.message });
    }
};

// Obtener todas las tareas
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        return res.json({ message: "Tareas obtenidas correctamente", data: tasks });
    } catch (error) {
        return res.status(500).json({ message: "Hubo un error al obtener las tareas", error: error.message });
    }
};

// Obtener una tarea por ID
exports.getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findOne({ _id: id, user: req.user.id });
        if (!task)
            return res.status(404).json({ message: "Tarea no encontrada" });

        return res.json({ message: "Tarea obtenida correctamente", data: task });
    } catch (error) {
        return res.status(500).json({ message: "Hubo un error al obtener la tarea", error: error.message });
    }
};

// Actualizar tarea
exports.updateTask = async (req, res) => {
    const { id } = req.params;
    try {
        if (req.body.title && req.body.title.trim() === "") {
            return res.status(400).json({ message: "El título no puede estar vacío" });
        }

        const updatedTask = await Task.findOneAndUpdate(
            { _id: id, user: req.user.id },
            req.body,
            { new: true }
        );

        if (!updatedTask)
            return res.status(404).json({ message: "Tarea no encontrada" });

        return res.json({ message: "Tarea actualizada correctamente", data: updatedTask });
    } catch (error) {
        return res.status(500).json({ message: "Hubo un error al actualizar la tarea", error: error.message });
    }
};

// Eliminar tarea
exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await Task.findOneAndDelete({ _id: id, user: req.user.id });
        if (!deletedTask)
            return res.status(404).json({ message: "Tarea no encontrada" });

        return res.json({ message: "Tarea eliminada correctamente", data: deletedTask });
    } catch (error) {
        return res.status(500).json({ message: "Hubo un error al eliminar la tarea", error: error.message });
    }
};
