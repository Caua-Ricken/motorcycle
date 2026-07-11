const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const verificarToken = require("../middleware/auth");

// Login
router.post("/login", authController.login);
router.post("/cadastrar", authController.cadastrar);

// Rota protegida para testar o token
router.get("/perfil", verificarToken, (req, res) => {
  res.json({
    message: "Rota protegida acessada",
    usuario: req.usuario,
  });
});

module.exports = router;