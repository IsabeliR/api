const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'nome',
    required: true
  },
  progress: {
    type: Number,
    required: true,
    min: 0,
    max: 100 // Progresso de 0 a 100%
  },
  updatedAt: {
    type: Date,
    default: Date.now // Armazena a data da última atualização
  }
});

const Progress = mongoose.model('Progress', progressSchema);
module.exports = Progress;
