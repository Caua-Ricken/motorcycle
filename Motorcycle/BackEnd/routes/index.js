const express = require('express');
const router = express.Router();

const produtoRoutes = require('./produtoRoutes');
router.use('/produto', produtoRoutes);

const authRoutes = require('./authRoutes');
router.use('/auth', authRoutes);

const categoriaRoutes = require("./categoriaRoutes");
router.use('/categoria', categoriaRoutes);

const movimentacaoRoutes = require('./movimentacaoRoutes');
router.use('/movimentacao', movimentacaoRoutes);

module.exports = router;