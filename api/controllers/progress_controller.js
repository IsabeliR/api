const Progress = require("../model/progress_model");
const User = require("../model/user_model");

// Inserir progresso de uma disciplina
exports.inserirProgresso = async (req, res) => {
  const { userId, disciplina, aula, progresso = 10, cor = "#FF5733" } = req.body;
  try {
    const usuario = await User.findById(userId);
    if (!usuario) return res.status(404).json({ message: "Usuário não encontrado!" });

    const progressoExistente = await Progress.findOne({ userId, aula });
    if (progressoExistente) {
      return res.status(200).json({ message: "Progresso já existe", progresso: progressoExistente });
    }

    const novoProgresso = new Progress({ userId, aula, disciplina, progresso, cor });
    await novoProgresso.save();
    res.status(201).json({ message: "Progresso inserido com sucesso!", progresso: novoProgresso });
  } catch (error) {
    res.status(500).json({ message: "Erro ao inserir progresso", error: error.message });
  }
};

// Atualizar progresso com incremento
exports.atualizarProgresso = async (req, res) => {
  const { userId, disciplina, aulaId, incremento = 10 } = req.body;
  try {
    const progresso = await Progress.findOne({ userId, disciplina, aulaId });
    if (!progresso) return res.status(404).json({ message: "Progresso não encontrado!" });

    progresso.progresso = Math.min(progresso.progresso + incremento, 100);
    progresso.updatedAt = Date.now();
    await progresso.save();

    const progressosDisciplina = await Progress.find({ userId, disciplina });
    const mediaProgresso = progressosDisciplina.reduce((sum, p) => sum + p.progresso, 0) / progressosDisciplina.length;
    res.status(200).json({ message: "Progresso atualizado com sucesso!", mediaProgresso });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar progresso", error: error.message });
  }
};

// Atualizar progresso de uma aula para 100%
exports.atualizarProgressoAula = async (req, res) => {
  const { userId, disciplina, aulaId, aula, cor = "#FF5733" } = req.body;

  if (!userId || !disciplina || !aulaId || !aula) {
    return res.status(400).json({ message: "Campos obrigatórios não fornecidos!" });
  }

  try {
    // Encontrar o usuário
    const usuario = await User.findById(userId);
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    console.log(usuario)

    // Verificar se já existe progresso para a disciplina e aulaId
    let progressoAtualizado = false;

    usuario.progresso.forEach(item => {
      if (item.disciplina === disciplina) {
        // Percorrer os tópicos para encontrar o progresso específico
        item.topicos.forEach(topico => {
          if (topico.aulaId === aulaId) {
            topico.progresso = 100; // Atualizar progresso
            topico.aula = aula;     // Atualizar nome da aula, se necessário
            topico.cor = cor;       // Atualizar cor, se fornecido
            progressoAtualizado = true;
          }
        });

        // Se progresso não foi encontrado, adicionar novo tópico
        if (!progressoAtualizado) {
          item.topicos.push({
            aulaId,
            aula,
            cor,
            progresso: 100,
            updatedAt: Date.now()
          });
        }
      }
    });

    // Salvar alterações no usuário
    await usuario.save();

    res.status(200).json({
      message: "Progresso atualizado com sucesso!",
      progresso: usuario.progresso
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao atualizar o progresso",
      error: error.message
    });
  }
};


// Buscar progresso por disciplina
exports.buscarProgressoPorDisciplina = async (req, res) => {
  const { disciplina } = req.body;
  try {
    if (!disciplina) return res.status(400).json({ message: "Disciplina não informada!" });

    const progressos = await Progress.find({ disciplina });
    res.status(200).json({ progressos });
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar progressos", error: error.message });
  }
};

// Buscar progresso por usuário
exports.buscarProgressoPorUsuario = async (req, res) => {
  const { userId } = req.body;
  try {
    if (!userId) return res.status(400).json({ message: "User ID não fornecido!" });

    const progressos = await Progress.find({ userId });
    res.status(200).json({ progressos });
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar progressos do usuário", error: error.message });
  }
};
// Buscar progresso de uma disciplina por usuário autenticado (com JWT)
exports.buscarProgresso = async (req, res) => {
  const { disciplina } = req.query; // Use query para GET
  if (!disciplina) {
    return res.status(400).json({ message: 'Disciplina não informada!' });
  }
  try {
    // Encontrar o usuário pela autenticação (JWT)
    const user = await User.findById(req.userId); // Aqui, req.userId é assumido como o ID do usuário do JWT
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }
    // Buscar o progresso da disciplina
    const disciplinaEncontrada = user.progresso.find(d => d.nome === disciplina);

    if (!disciplinaEncontrada) {
      return res.status(404).json({ message: 'Disciplina não encontrada no progresso!' });
    }

    // Retornar as aulas e seus progressos
    return res.json(disciplinaEncontrada.aulas);
  } catch (error) {
    console.error('Erro ao buscar progresso:', error);
    return res.status(500).json({ message: 'Erro no servidor!' });
  }
};
