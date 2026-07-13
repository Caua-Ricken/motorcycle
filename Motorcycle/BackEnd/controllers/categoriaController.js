const { Categoria } = require("../models/index");

module.exports = {

    async cadastrarCategoria(req, res) {
        const { nome } = req.body;

        if (!nome) {
            return res.status(400).json({
                message: "O nome da categoria é obrigatório.",
            });
        }

        try {
            const categoria = await Categoria.create({ nome });

            return res.status(201).json({
                message: "Categoria cadastrada com sucesso.",
                categoria,
            });
        } catch (error) {
            console.error("Erro ao cadastrar categoria:", error);

            return res.status(500).json({
                message: "Erro ao cadastrar categoria.",
                error: error.message,
            });
        }
    },

    async buscarCategoria(req, res) {

        try {
            const categoria = await Categoria.findAll({ raw: true });
            return res.status(200).json(categoria);
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);

            return res.status(500).json({
                message: "Erro ao buscar categorias.",
                error: error.message,
            });
        }
    },

}