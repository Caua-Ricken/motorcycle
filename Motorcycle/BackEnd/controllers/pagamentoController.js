const { Pagamento } = require('../models/index');
const {Op} = require('sequelize');

module.exports = {

    async cadastrarPagamento(req, res) {
        const { nome, tipo, descricao, parcelasMaxima, ativo, vencimento } = req.body;

        try {
            if (!nome) {
                return res.status(400).json({
                    message: "Informe o nome da forma de pagamento.",
                });
            }

            const pagamentoExiste = await Pagamento.findOne({
                where: { nome },
            });

            if (pagamentoExiste) {
                return res.status(400).json({
                    message: "Já existe uma forma de pagamento com esse nome.",
                });
            }

            const pagamento = await Pagamento.create({
                nome,
                tipo,
                descricao,
                parcelasMaxima: 
                 tipo === "credito" ? Number(parcelasMaxima) : 1,
                vencimento: 
                 tipo === "boleto" ? Number(vencimento) : 1,
                ativo: ativo ?? true,
            });

            return res.status(201).json({
                message: "Forma de pagamento cadastrada com sucesso.",
                pagamento,
            });
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                message: "Erro ao cadastrar a forma de pagamento.",
            });
        }
    },

   async buscarPagamento(req, res) {
  try {
    const pagamento = await Pagamento.findAll({
      raw: true,
    });

    return res.status(200).json(
        pagamento
    );

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erro ao buscar as formas de pagamento.",
    });
  }
},

async deletarPagamento(req, res) {
  const { id } = req.params;

  try {
    const pagamento = await Pagamento.findByPk(id);

    if (!pagamento) {
      return res.status(404).json({
        message: "Forma de pagamento não encontrada.",
      });
    }

    await pagamento.destroy();

    return res.status(200).json({
      message: "Forma de pagamento excluída com sucesso.",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erro ao excluir a forma de pagamento.",
    });
  }
},

async editarPagamento(req, res) {
  const { id } = req.params;

  const {
    nome,
    tipo,
    descricao,
    parcelasMaxima,
    ativo,
    vencimento,
  } = req.body;

  try {
    const pagamento = await Pagamento.findByPk(id);

    if (!pagamento) {
      return res.status(404).json({
        message: "Forma de pagamento não encontrada.",
      });
    }

    if (!nome) {
      return res.status(400).json({
        message: "Informe o nome da forma de pagamento.",
      });
    }

    const pagamentoExiste = await Pagamento.findOne({
      where: {
        nome,
        id: {
          [Op.ne]: id,
        },
      },
    });

    if (pagamentoExiste) {
      return res.status(400).json({
        message: "Já existe outra forma de pagamento com esse nome.",
      });
    }

    await pagamento.update({
      nome,
      tipo,
      descricao,
      parcelasMaxima:
        tipo === "credito"
          ? Number(parcelasMaxima)
          : 1,
      vencimento:
        tipo === "boleto"
          ? Number(vencimento)
          : 1,
      ativo,
    });

    return res.status(200).json({
      message: "Forma de pagamento atualizada com sucesso.",
      pagamento,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erro ao atualizar a forma de pagamento.",
    });
  }
},

async alterarStatus(req, res) {
  const { id } = req.params;
  const { ativo } = req.body;

  try {
    const pagamento = await Pagamento.findByPk(id);

    if (!pagamento) {
      return res.status(404).json({
        message: "Forma de pagamento não encontrada.",
      });
    }

    await pagamento.update({
      ativo,
    });

    return res.status(200).json({
      message: `Forma de pagamento ${
        ativo ? "ativada" : "desativada"
      } com sucesso.`,
      pagamento,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erro ao alterar o status da forma de pagamento.",
    });
  }
},

async buscarPagamentoAtivo(req, res) {
  try {
    const pagamentos = await Pagamento.findAll({
      where: {
        ativo: true,
      },
    });

    return res.status(200).json(pagamentos);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erro ao buscar formas de pagamento.",
    });
  }
},

}