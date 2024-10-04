const Progress = require('../model/progress_model');
const User = require('../model/user_model'); 

// Criar ou atualizar o progresso de um usuário para uma aula específica
exports.updateProgress = async (req, res) => {
  try {
    const { userId, aulaId, progress, cor } = req.body;

    // Verificar se o usuário existe
    const usuario = await User.findById(userId);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    // Verificar se o progresso do usuário para essa aula já existe
    const progressoExistente = await Progress.findOne({ userId, aulaId });
    if (progressoExistente) {
      // Atualiza o progresso existente
      progressoExistente.progress = progress;
      progressoExistente.cor = cor || progressoExistente.cor;
      progressoExistente.updatedAt = Date.now();
      await progressoExistente.save();
      return res.status(200).json({ message: 'Progresso da aula atualizado com sucesso!' });
    }

    // Se não existir, cria um novo registro de progresso
    const novoProgresso = new Progress({ userId, aulaId, progress, cor });
    await novoProgresso.save();
    res.status(201).json({ message: 'Progresso da aula cadastrado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o progresso da aula', error });
  }
};

// Buscar o progresso de todos os usuários para todas as aulas
exports.buscarProgresso = async (req, res) => {
  try {
    const progressos = await Progress.find().populate('userId').populate('aulaId');
    res.status(200).json({ progressos });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar progressos', error });
  }
};
