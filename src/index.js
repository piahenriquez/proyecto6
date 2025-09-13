// Cargar variables de entorno
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectDB = require("./config/db");



const userRoutes = require("./routes/user.Routes");
const taskRoutes = require("./routes/task.Routes");


// Inicializar la app
const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors());
app.use(express.json());//permite recibir datos en formato JSON

// Rutas
app.get("/", (req, res) => {
    res.json({ message: "API To-Do List funcionando!" });
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tasks", taskRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});