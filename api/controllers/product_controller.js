const Produto = require('../model/product_model');

exports.createProduct = async(req,res)=>{
  try {
    const produtoExistente = await Produto.findOne({ nome: req.body.nome });
    if (produtoExistente) {
      return res.status(409).json({ message: 'Esse produto já foi cadastrado!' });
    }
    const novoProduto = new Produto(req.body);
    await novoProduto.save();
    res.status(201).json({message: 'Produto cadastrado com sucesso!'});
  }catch(error){
    res.status(500).json({message: 'Erro ao cadastrar produto', error});
  }
}

exports.buscarProdutos = async(req, res)=>{
  try{
    const produtos = await Produto.find();
    res.status(200).json({produtos});
  }catch(error){
    res.status(500).json({message: 'Erro ao buscar produtos', error});
  }
}
