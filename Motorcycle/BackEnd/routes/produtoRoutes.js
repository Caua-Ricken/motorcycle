const express = require('express');
const router = express.Router();
const produtoController = require("../controllers/produtoController");

router.post('/', produtoController.criarProduto);

router.get('/', produtoController.buscarProduto);

module.exports = router;