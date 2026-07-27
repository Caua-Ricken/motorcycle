const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const verificarToken = require("../middleware/auth");

// Login
router.post("/login", authController.login);
router.post("/cadastrar", authController.cadastrar);

// Rota protegida para testar o token
router.get("/validar-adm", verificarToken, (req, res) => {
  if(req.usuario.role !== "admin") {
    return res.status(403).json({message: "Acesso permitido apenas para administradores"})
  };
  return res.status(200).json({message: "Administrador autorizado"});
})

module.exports = router;