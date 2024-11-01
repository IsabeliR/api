const mongoose = require('mongoose');

const produtosSchema = new mongoose.Schema({
  nome: String,
  categoria: String,
  detalhes: {
    professor: String,
    avaliacoes: {
      media: Number,
    },
  },
  imagem: String,
  videoUrl: String
})

const Produto = mongoose.model('materias',produtosSchema);
module.exports=Produto;