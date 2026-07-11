const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");

const JWT_SECRET = "dZiz1sr2HYGCE9Nn2WRTfTCbc1wFLAsZANuGkPG4mJg";

module.exports = {

async login(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        message: "E-mail e senha são obrigatórios",
      });
    }

    const usuario = await Usuario.findOne({
      where: { email },
    });

    if (!usuario) {
      return res.status(404).json({
        message: "Usuário não encontrado",
      });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({
        message: "Senha inválida",
      });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        role: usuario.role,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      message: "Login realizado com sucesso",
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        role: usuario.role,
      },
    });
  } catch (error) {
    console.error("Erro ao realizar login:", error);

    return res.status(500).json({
      message: "Erro interno ao realizar login",
    });
  }
},


async cadastrar(req, res) {
  try {
    const { nome, email, senha, role } = req.body;

    if (!nome || !email || !senha || !role) {
      return res.status(400).json({
        message: "Nome, e-mail e senha são obrigatórios",
      });
    }

    const usuarioExistente = await Usuario.findOne({
      where: { email },
    });

    if (usuarioExistente) {
      return res.status(409).json({
        message: "Este e-mail já está cadastrado",
      });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: senhaCriptografada,
      role,
    });

    return res.status(201).json({
      message: "Usuário cadastrado com sucesso",
      usuario: {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        role: novoUsuario.role,
      },
    });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);

    return res.status(500).json({
      message: "Erro ao cadastrar usuário",
    });
  }
},

}