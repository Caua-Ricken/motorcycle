const express = require('express');
const router = express.Router();
const categoriaController = require("../controllers/categoriaController");

router.post('/', categoriaController.cadastrarCategoria);

router.get('/', categoriaController.buscarCategoria);

module.exports = router;