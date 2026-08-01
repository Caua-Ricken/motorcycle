const { Usuario } = require("../models");

module.exports = {
  async buscarUsuario(req, res) {
    try {
      const usuarios = await Usuario.findAll({
        raw: true,
      });

      return res.status(200).json(usuarios);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Erro ao buscar os usuários.",
      });
    }
  },
};