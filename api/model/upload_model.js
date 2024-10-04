// api/models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePhoto: { type: String } // Campo para armazenar o caminho da foto de perfil
});

module.exports = mongoose.model('Upload', userSchema);
