const sequelize = require("../db/mysql");
const {Produto, Categoria, Movimentacoes} = require("../models/index");

module.exports = {

    async criarProduto(req, res) {
        const {nome, peso, preco, marca, image, categoriaId} = req.body;

        try {
            const produto = await Produto.create({
                nome, peso, preco, marca, image, categoriaId, estoque: 0
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

            const movimentacaoVinculada = await Movimentacoes.findOne({
                where: { produtoId: id },
            });

            if (movimentacaoVinculada) {
                return res.status(400).json({
                    message: "Não é possível excluir este produto, pois ele possui movimentações vinculadas.",
                });
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

async buscarById(req, res) {
    const { id } = req.params;

    try {
        const produto = await Produto.findByPk(id);

        if (!produto) {
            return res.status(404).json({
                message: "Produto não encontrado",
            });
        }

        return res.status(200).json(produto);

    } catch (error) {
        console.error("Erro ao buscar produto:", error);

        return res.status(500).json({
            message: "Erro ao buscar produto",
        });
    }
  },

  async finalizarCompra(req, res) {
    const { itens } = req.body;

    if (!Array.isArray(itens) || itens.length === 0) {
      return res.status(400).json({
        message: "Nenhum produto foi informado.",
      });
    }

    const transaction = await sequelize.transaction();

    try {
      for (const item of itens) {
        const produto = await Produto.findByPk(item.id, {
          transaction,
          lock: transaction.LOCK.UPDATE,
        });

        if (!produto) {
          await transaction.rollback();

          return res.status(404).json({
            message: `Produto com ID ${item.id} não encontrado.`,
          });
        }

        const quantidade = Number(item.quantidade);

        if (!Number.isInteger(quantidade) || quantidade <= 0) {
          await transaction.rollback();

          return res.status(400).json({
            message: `Quantidade inválida para o produto ${produto.nome}.`,
          });
        }

        if (produto.estoque < quantidade) {
          await transaction.rollback();

          return res.status(400).json({
            message: `Estoque insuficiente para ${produto.nome}. Estoque disponível: ${produto.estoque}.`,
          });
        }

        produto.estoque -= quantidade;

        await produto.save({
          transaction,
        });
      }

      await transaction.commit();

      return res.status(200).json({
        message: "Compra finalizada e estoque atualizado com sucesso.",
      });
    } catch (error) {
      await transaction.rollback();

      console.error(error);

      return res.status(500).json({
        message: "Erro ao finalizar a compra.",
      });
    }
  },
}