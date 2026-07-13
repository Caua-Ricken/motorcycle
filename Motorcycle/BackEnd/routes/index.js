const express = require('express');
const router = express.Router();

const produtoRoutes = require('./produtoRoutes');
router.use('/produto', produtoRoutes);

const authRoutes = require('./authRoutes');
router.use('/auth', authRoutes);

const categoriaRoutes = require("./categoriaRoutes");
router.use('/categoria', categoriaRoutes);

module.exports = router;