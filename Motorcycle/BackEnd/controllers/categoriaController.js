const { Categoria, Produto } = require("../models/index");

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

    async editarCategoria(req, res) {
        const { id } = req.params;
        const { nome } = req.body;

        try {
         const categoria = await Categoria.findByPk(id);

            await categoria.update({
                nome
            });

            return res.status(201).json({
                message: "Categoria editada com sucesso."
            });
            
        } catch (error) {
            console.error("Erro ao editar categoria:", error);

            return res.status(500).json({
                message: "Erro ao editar categoria.",
                error: error.message,
            });   
        }
    },

    async deletarCategoria(req, res) {
        const { id } = req.params;

        try {
             const categoria = await Categoria.findByPk(id);

            if (!categoria) {
                return res.status(404).json({ error: "Produto não encontrado" });
            }

             const produtoVinculado = await Produto.findOne({
                where: { categoriaId: id },
            });

            if (produtoVinculado) {
                return res.status(400).json({
                    message: "Não é possível excluir esta categoria, pois existem produtos vinculados a ela.",
                });
            }

            await categoria.destroy();

            return res.status(200).json({
                message: "Categoria excluída com sucesso.",
            });

        } catch (error) {
            console.error("Erro ao deletar categoria:", error);

            return res.status(500).json({
                error: "Erro ao deletar categoria",
                details: error.message,
        });
      }
    },

}