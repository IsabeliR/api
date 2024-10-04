const User = require('../model/user_model');

exports.uploadPhoto = async (req, res) => {
  try {
    console.log("Req body:", req.body);
    console.log("Req file:", req.file);

    if (!req.body) {
      return res.status(400).json({ message: "Nenhum arquivo foi enviado." });
    }

    const username = req.body.username;
    const updatedUser = await User.findOneAndUpdate(
      { nome: username },
      { profilePhoto: req.body.profilePhoto },
      { new: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res
      .status(200)
      .json({
        message: "Foto de perfil atualizada com sucesso",
        user: updatedUser,
      });
  } catch (error) {
    console.error("Erro ao atualizar a foto de perfil:", error);
    res
      .status(500)
      .json({ message: "Erro ao atualizar a foto de perfil", error });
  }
};
