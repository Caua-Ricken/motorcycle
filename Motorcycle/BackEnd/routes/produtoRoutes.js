const express = require('express');
const router = express.Router();
const produtoController = require("../controllers/produtoController");

router.post('/', produtoController.criarProduto);

router.get('/', produtoController.buscarProduto);

router.put('/:id', produtoController.editarProduto);

router.delete('/:id', produtoController.deletarProduto);

router.get('/:id', produtoController.buscarById);

module.exports = router;