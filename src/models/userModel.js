const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true, // Asegura que no haya usuarios con el mismo nombre
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Asegura que no haya usuarios con el mismo email
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Por favor ingresa un email válido']

    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
}, {
     timestamps: true,
}
);

//middleware
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const bcrypt = require('bcryptjs');
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
