const express = require('express');
const router = express.Router();
const pagamentoController = require("../controllers/pagamentoController");

router.post('/', pagamentoController.cadastrarPagamento);

router.get('/', pagamentoController.buscarPagamento);

router.delete('/:id', pagamentoController.deletarPagamento);

router.put('/:id', pagamentoController.editarPagamento);

router.put('/status/:id', pagamentoController.alterarStatus);


module.exports = router;