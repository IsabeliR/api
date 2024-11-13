const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Referência ao modelo User
    required: true
  },
  disciplina: {
    type: String,
    required: true
  },
  aulaId: {  // Novo campo para identificar a aula
    type: String,
    required: true
  },
  progresso: {
    type: Number,
    required: true,
    min: 0,
    max: 100  // Percentual de progresso entre 0 e 100
  },
  cor: {
    type: String,
    required: true  // Cor associada ao progresso
  },
  updatedAt: {
    type: Date,
    default: Date.now  // Data da última atualização
  }
});

const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress;
