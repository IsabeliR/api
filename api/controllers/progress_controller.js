const Progress = require('../model/progress_model');
const User = require('../model/user_model'); 
// Criar ou atualizar o progresso de um usuário
exports.updateProgress = async (req, res) => {
  try {
    const { userId, progress } = req.body;

    // Verificar se o usuário existe
    const usuario = await User.findById(userId);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    // Verificar se o progresso do usuário já existe
    const progressoExistente = await Progress.findOne({ userId });
    if (progressoExistente) {
      // Atualiza o progresso existente
      progressoExistente.progress = progress;
      await progressoExistente.save();
      return res.status(200).json({ message: 'Progresso atualizado com sucesso!' });
    }

    // Se não existir, cria um novo registro de progresso
    const novoProgresso = new Progress({ userId, progress });
    await novoProgresso.save();
    res.status(201).json({ message: 'Progresso cadastrado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o progresso', error });
  }
};

// Buscar o progresso de todos os usuários
exports.buscarProgresso = async (req, res) => {
  try {
    const progressos = await Progress.find();
    res.status(200).json({ progressos });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar progressos', error });
  }
};
