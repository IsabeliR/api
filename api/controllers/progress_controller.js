const Progress = require('../model/progress_model');
const User = require('../model/user_model'); 

// Inserir progresso de uma disciplina
exports.inserirProgresso = async (req, res) => {
  try {
    const { userId, disciplina } = req.body;

    // Verificar se o usuário existe
    const usuario = await User.findById(userId);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    // Verificar se o progresso já existe para evitar duplicação
    const progressoExistente = await Progress.findOne({ userId, disciplina });
    if (progressoExistente) {
      return res.status(200).json({ message: 'Progresso já existe', progresso: progressoExistente });
    }

    // Criar um novo progresso com início em 10%
    const novoProgresso = new Progress({
      userId,
      disciplina,
      progresso: 10,  // Inicia com 10% ao primeiro clique
      cor: "#FF5733"  // Cor padrão, pode ser personalizada
    });

    // Salvar o progresso no banco de dados
    await novoProgresso.save();

    res.status(201).json({ message: 'Progresso inserido com sucesso!', progresso: novoProgresso });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao inserir progresso', error: error.message });
  }
};

// Atualizar o progresso de uma aula específica dentro de uma disciplina para 100%
exports.atualizarProgressoAula = async (req, res) => {
  try {
    const { userId, disciplina, aulaId } = req.body;

    // Verifica se o userId foi enviado corretamente
    if (!userId) {
      return res.status(400).json({ message: 'User ID não fornecido!' });
    }

    console.log('Dados recebidos para atualizar progresso da aula:', req.body);

    // Verificar se o progresso da aula existe
    const progressoExistente = await Progress.findOne({ userId, disciplina, aulaId });
    if (!progressoExistente) {
      console.log("Progresso da aula não encontrado.");
      return res.status(404).json({ message: 'Progresso da aula não encontrado!' });
    }

    // Atualizar progresso da aula para 100%
    progressoExistente.progresso = 100;
    progressoExistente.updatedAt = Date.now(); // Atualiza a data de modificação

    // Salvar as alterações
    await progressoExistente.save();
    console.log("Progresso da aula atualizado com sucesso para 100%.");

    res.status(200).json({ message: 'Progresso da aula atualizado para 100%!', progresso: progressoExistente.progresso });
  } catch (error) {
    console.error("Erro ao atualizar progresso da aula:", error.message);
    res.status(500).json({ message: 'Erro ao atualizar progresso da aula', error: error.message });
  }
};

// Função para adicionar o progresso, caso ainda não exista
exports.inserirProgresso = async (req, res) => {
  try {
    const { userId, disciplina } = req.body;

    // Verificar se o usuário existe
    const usuario = await User.findById(userId);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    // Verificar se o progresso já existe
    const progressoExistente = await Progress.findOne({ userId, disciplina });
    if (progressoExistente) {
      return res.status(200).json({ message: 'Progresso já existe', progresso: progressoExistente });
    }

    // Criar um novo progresso com início em 10%
    const novoProgresso = new Progress({
      userId,
      disciplina,
      progresso: 10,  // Inicia com 10% no primeiro clique
      cor: "#FF5733"  // Cor padrão
    });

    // Salvar o progresso
    await novoProgresso.save();

    res.status(201).json({ message: 'Progresso inserido com sucesso!', progresso: novoProgresso });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao inserir progresso', error: error.message });
  }
};

// Buscar progresso por disciplina
exports.buscarProgressoPorDisciplina = async (req, res) => {
  try {
    const { disciplina } = req.body;

    if (!disciplina) {
      return res.status(400).json({ message: 'Disciplina não informada!' });
    }

    // Buscar todos os progressos para a disciplina específica
    const progressos = await Progress.find({ disciplina });

    // Verificar se encontrou algum progresso
    if (progressos.length === 0) {
      return res.status(404).json({ message: 'Nenhum progresso encontrado para essa disciplina!' });
    }

    res.status(200).json({ progressos });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar progressos', error: error.message });
  }
};

// Incrementar o progresso em 10%, até o máximo de 100%
exports.atualizarProgresso = async (req, res) => {
  try {
    const { userId, disciplina } = req.body;

    // Verificar se o progresso já existe para evitar duplicação
    const progressoExistente = await Progress.findOne({ userId, disciplina });
    if (!progressoExistente) {
      return res.status(404).json({ message: 'Progresso não encontrado!' });
    }

    // Incrementar o progresso em 10%, até o máximo de 100%
    progressoExistente.progresso = Math.min(progressoExistente.progresso + 10, 100);
    progressoExistente.updatedAt = Date.now(); // Atualizar a data da última modificação

    // Salvar as alterações
    await progressoExistente.save();

    res.status(200).json({ message: 'Progresso atualizado com sucesso!', progresso: progressoExistente.progresso });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar progresso', error: error.message });
  }
};
// Buscar progresso de todas as disciplinas para um usuário
exports.buscarProgressoPorUsuario = async (req, res) => {
  try {
    const { userId } = req.body;

    // Verificar se o userId foi enviado corretamente
    if (!userId) {
      return res.status(400).json({ message: 'User ID não fornecido!' });
    }

    // Buscar todos os progressos para o usuário específico
    const progressos = await Progress.find({ userId });

    // Verificar se encontrou algum progresso
    if (progressos.length === 0) {
      return res.status(404).json({ message: 'Nenhum progresso encontrado para esse usuário!' });
    }

    res.status(200).json({ progressos });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar progressos do usuário', error: error.message });
  }
};

