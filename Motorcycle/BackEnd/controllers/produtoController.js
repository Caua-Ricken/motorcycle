const {Produto} = require("../models/index");

module.exports = {

    async criarProduto(req, res) {
        const {nome, peso, preco, marca, image, categoriaId} = req.body;

        try {
            const produto = await Produto.create({
                nome, peso, preco, marca, image, categoriaId
            });

            return res.status(201).json({
                message: "Categoria cadastrada com sucesso."
            });
            
        } catch (error) {
            console.error("Erro ao cadastrar categoria:", error);

            return res.status(500).json({
                message: "Erro ao cadastrar categoria.",
                error: error.message,
            });   
        }
    },

    async buscarProduto(req, res) {

         try {
            const produto = await Produto.findAll({ raw: true });
            return res.status(200).json(produto);

        } catch (error) {
            console.error("Erro ao buscar categorias:", error);

            return res.status(500).json({
                message: "Erro ao buscar categorias.",
                error: error.message,
            });
        }
    }
}