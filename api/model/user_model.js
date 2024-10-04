const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    },
  profilePhoto: {
    type: String,
    default: null
  }
});

const User = mongoose.model('users', userSchema);
module.exports = User;
