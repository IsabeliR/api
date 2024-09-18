const User = require("../model/user_model");

async function registerUser(req, res) {
  const { nome, email, password } = req.body;

  // Verificar se todos os campos foram preenchidos
  if (!nome || !email || !password) {
    return res
      .status(400)
      .send({ message: "Todos os campos são obrigatórios!" });
  }

  const userExists = await User.findOne({ email: email });
  if (userExists) {
    return res.status(400).send({ message: "E-mail já cadastrado!" });
  }

  const newUser = new User({
    nome,
    email,
    password,
  });

  try {
    await newUser.save();

    res.status(201).send({ message: "Cadastro realizado com sucesso!" });
  } catch (error) {
    console.error({ message: "Erro ao cadastrar usuário:" }, error);
    res.status(500).send({ message: "Erro interno do servidor" });
  }
}

async function loginUser(req, res) {
  const { email, senha } = req.body;
  try {
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ message: "Usuário Inexistente!" });
    }

    console.log(`Usuário Senha: ${usuario.password}`);
    console.log(`Senha enviada: ${senha}`)
    if (usuario.password === senha) {
      res.status(200).json({ message: "Login realizado com sucesso!" });
    }else {
      res.status(401).json({ message: "Senha incorreta!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao realizar o login!", error });
  }
};

async function listUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    res.status(500).send("Erro interno do servidor");
  }
}

async function deleteUser(req, res) {
  const { userId } = req.params; // Pegando o ID do usuário a ser deletado
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    await user.remove();

    res.status(200).json({ message: "Usuário excluído com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}
async function updateUser(req, res) {
  const { userId } = req.params;
  const { email, senha } = req.body; // Pegando os novos valores enviados na requisição

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "ID de usuário inválido!" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }
    // Atualizar o email e/ou a senha, se fornecidos
    if (email) user.email = email;
    if (senha) user.password = senha;

    await user.save();

    res.status(200).json({ message: "Usuário atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}


module.exports = {
  registerUser,
  listUsers,
  loginUser,
  deleteUser,
  updateUser,
};
