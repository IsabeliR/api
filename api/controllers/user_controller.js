const User = require("../model/user_model");
const mongoose = require("mongoose");


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
    console.log(`Senha enviada: ${senha}`);

    console.log('usuario: ', usuario);
    if (usuario.password === senha) {
      console.log('eieiei');
      res.status(200).json({ message: "Login realizado com sucesso!", usuario: {
        nome: usuario.nome,
        email: usuario.email,
        avatar: usuario.profilePhoto,
      }, userId: usuario._id });
    } else {
      res.status(401).json({ message: "Senha incorreta!" });
    }
  } catch (error) {
    console.log('bababou', error);
    res.status(500).json({ message: "Erro ao realizar o login!", error });
  }
}

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
  const { userId } = req.body; // Pegando o ID do usuário a ser deletado do corpo da requisição

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "ID de usuário inválido!" });
  }

  try {
    // Encontra e deleta o usuário pelo ID
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    res.status(200).json({ message: "Usuário excluído com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor", error });
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
};

// Função para atualizar a foto de perfil
async function updateProfilePhoto(req, res) {
  console.log("Corpo da requisição:", req.body);
  const { userId, profilePhoto } = req.body; // Pegamos o ID do usuário e o novo avatar
  // Verificar se o userId e a foto foram fornecidos
  if (!userId || !profilePhoto) {
    return res.status(400).json({ message: "ID do usuário e foto são obrigatórios!" });
  }
  try {
    // Busca e atualiza o usuário pelo ID
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePhoto }, // Atualiza o campo profilePhoto com o novo avatar
      { new: true } // Retorna o documento atualizado
    );

    // Se o usuário não for encontrado
    if (!updatedUser) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }
    // Resposta de sucesso
    res.status(200).json({
      message: "Foto de perfil atualizada com sucesso!",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Erro ao atualizar a foto de perfil:", error);
    res.status(500).json({ message: "Erro ao atualizar a foto de perfil", error });
  }
};

async function getAvatarUsuario(req, res) {
  const { userId } = req.body;

  const usuario = await User.findById(userId);
  if(!usuario) {
    return res.status(404).json({ message: "Usuário não encontrado!" });
  }

  return res.status(200).json({
    message: "Avatar do usuário encontrado!",
    avatar: usuario.profilePhoto,
  });
};
const getUserName = async (req, res) => {
  const { userId } = req.body; // Pega o userId da requisição

  if (!userId) {
    return res.status(400).json({ message: "userId é necessário" });
  }

  try {
    // Aqui você já deve ter algum método para buscar o usuário no banco
    const user = await User.findById(userId); // Ajuste conforme seu modelo

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Retorna apenas o nome do usuário
    return res.status(200).json({ nome: user.nome });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar nome do usuário" });
  }
};

module.exports = {
  registerUser,
  listUsers,
  loginUser,
  deleteUser,
  updateUser,
  updateProfilePhoto,
  getAvatarUsuario,
  getUserName
};
