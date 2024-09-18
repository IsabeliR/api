const moongose = require('mongoose');

const connectDB = async () => {
  try{
    await moongose.connect("mongodb+srv://esterramalhosampaio:pb6aqIBxe2U3OSj7@mydb.yjpkh.mongodb.net/?retryWrites=true&w=majority&appName=MyDB");
    console.log('Conectado ao banco de dados');
  }catch(error){
    console.log('Erro ao conectar ao banco de dados', error);
  }
}

module.exports = { connectDB }