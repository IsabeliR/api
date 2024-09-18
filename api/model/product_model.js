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
})

const Produto = mongoose.model('produtos',produtosSchema);
module.exports=Produto;