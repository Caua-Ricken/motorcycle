const express = require('express');
const router = express.Router();
const movimentacaoController = require("../controllers/movimentacaoController");

router.post('/', movimentacaoController.cadastrarMovimentacao);

router.get('/', movimentacaoController.buscarMovimentacao);

router.delete('/:id', movimentacaoController.deletarMovimentacao);

module.exports = router;