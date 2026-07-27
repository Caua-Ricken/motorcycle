const { Pagamento } = require('../models/index');

module.exports = {

    async cadastrarPagamento(req, res) {
        const { nome, tipo, descricao, parcelasMaximas, icone, ativo } = req.body;

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
                parcelasMaximas,
                icone,
                ativo,
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


}