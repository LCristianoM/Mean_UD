const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const UsuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'Por favor ingrese un nombre ']
    },
    apellido: {
        type: String,
        required: [true, 'Por favor ingrese un apellido ']
    },
    nick: {
        type: String,
        required: [true, 'Por favor ingrese un nick ']
    },
    email: {
        type: String,
        required: [true, 'Por favor ingrese un email '],
        unique: true,
        match: [
            //regex(regexlib) para la validación de que sea un email correcto
            /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/, 
            'Ingrese un email valido'
        ]
    },
    password: {
        type: String,
        required: [true, 'Por favor ingrese un password '],
        minlength: 6,
        select: false
    }
});

//middleware para enriptar la contraseña
UsuarioSchema.pre('save', async function(next) { 
    const salt = await bcrypt.genSalt(10); //permite tomar un pass plano y crear una cedena de caracteres aleatorios.

    this.password = await bcrypt.hash(this.password, salt);
});

UsuarioSchema.methods.crearJsonWebToken = function() {
    return jwt.sign( { nick: this.nick }, process.env.JWT_SECRET_WORD,{
        expiresIn: process.env.JWT_EXPIRE 
    } )
};

UsuarioSchema.methods.validarPassword = async function(passwordUsuario){
    
    return await bcrypt.compare(passwordUsuario, this.password);
};

module.exports = mongoose.model('Usuario', UsuarioSchema);