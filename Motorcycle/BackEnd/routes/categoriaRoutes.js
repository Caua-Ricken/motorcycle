const express = require('express');
const router = express.Router();
const categoriaController = require("../controllers/categoriaController");

router.post('/', categoriaController.cadastrarCategoria);

router.get('/', categoriaController.buscarCategoria);

router.put('/:id', categoriaController.editarCategoria);

router.delete('/:id', categoriaController.deletarCategoria);

module.exports = router;