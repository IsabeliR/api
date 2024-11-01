const Progress = require('../model/progress_model');
const User = require('../model/user_model'); 

exports.inserirProgresso = async (req, res) => {
  try {
    const { userId, disciplina, progresso, cor } = req.body;

    // Verificar se o usuário existe
    const usuario = await User.findById(userId);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    // Criar um novo progresso
    const novoProgresso = new Progress({
      userId,
      disciplina,
      progresso,
      cor
    });

    // Salvar o progresso no banco de dados
    await novoProgresso.save();

    res.status(201).json({ message: 'Progresso inserido com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao inserir progresso', error: error.message });
  }
};

// Atualizar o progresso de uma disciplina
exports.atualizarProgresso = async (req, res) => {
  try {
    const { userId, disciplina, progresso, cor } = req.body;

    // Verificar se o progresso já existe
    const progressoExistente = await Progress.findOne({ userId, disciplina });

    if (!progressoExistente) {
      return res.status(404).json({ message: 'Progresso não encontrado!' });
    }

    // Atualizar o progresso
    progressoExistente.progresso = progresso;
    progressoExistente.cor = cor || progressoExistente.cor;
    progressoExistente.updatedAt = Date.now();

    // Salvar as alterações
    await progressoExistente.save();

    res.status(200).json({ message: 'Progresso atualizado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar progresso', error: error.message });
  }
};

// Buscar progresso por disciplina
exports.buscarProgressoPorDisciplina = async (req, res) => {
  try {
    const { disciplina } = req.body;

    if (!disciplina) {
      return res.status(400).json({ message: 'Disciplina não informada!' });
    }

    // Buscar progressos para a disciplina específica
    const progressos = await Progress.find({ disciplina });

    if (progressos.length === 0) {
      return res.status(404).json({ message: 'Nenhum progresso encontrado para essa disciplina!' });
    }

    res.status(200).json({ progressos });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar progressos', error: error.message });
  }
};
