const {Produto, Categoria} = require("../models/index");

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
            const produto = await Produto.findAll({ 
                include: [
                    {
                    model: Categoria,
                    attributes: ["nome"]
                    }
                ]

            });
            return res.status(200).json(produto);

        } catch (error) {
            console.error("Erro ao buscar categorias:", error);

            return res.status(500).json({
                message: "Erro ao buscar categorias.",
                error: error.message,
            });
        }
    },

    async editarProduto(req, res) {
         const { id } = req.params;
         const {nome, peso, preco, marca, image, categoriaId} = req.body;

        try {
            const produto = await Produto.findByPk(id);

            await produto.update({
                nome, peso, preco, marca, image, categoriaId
            });

            return res.status(201).json({
                message: "Produto editado com sucesso."
            });
            
        } catch (error) {
            console.error("Erro ao editar produto:", error);

            return res.status(500).json({
                message: "Erro ao editar produto.",
                error: error.message,
            });   
        }
    },

    async deletarProduto(req, res) {
        const { id } = req.params;

        try {
             const produto = await Produto.findByPk(id);

            if (!produto) {
                return res.status(404).json({ error: "Produto não encontrado" });
            }

            await produto.destroy();

            return res.status(200).json({
                message: "Produto deletado com sucesso",
            });

        } catch (error) {
            console.error("Erro ao deletar produto:", error);

            return res.status(500).json({
                error: "Erro ao deletar produto",
                details: error.message,
        });
     }
  },
}