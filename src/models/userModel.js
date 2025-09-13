const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true, // Asegura que no haya usuarios con el mismo nombre
        minlegth: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Asegura que no haya usuarios con el mismo email
        lowercase: true,
        match: [/.+\@.+\..+/, 'Por favor ingresa un email válido'] // Validación básica de formato de email
    },
    password: {
        type: String,
        required: true,
        minlegth: 6,
    },
}, {
     timestamps: true,
}
);

const User = mongoose.model('User', userSchema);

module.exports = User;
