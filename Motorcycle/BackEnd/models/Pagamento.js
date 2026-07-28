const { DataTypes } = require("sequelize");
const conn = require("../db/mysql");

const Pagamento = conn.define(
    "Pagamento",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "pag_id",
        },

        nome: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            field: "pag_nome",
        },

        tipo: {
            type: DataTypes.ENUM(
                "pix",
                "credito",
                "debito",
                "boleto",
                "dinheiro"
            ),
            allowNull: false,
            field: "pag_tipo",
        },

        descricao: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: "pag_descricao",
        },

        parcelasMaxima: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            field: "pag_parcelas_maximas",
            validate: {
                min: 1,
            },
        },

        ativo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            field: "pag_ativo",
        },

        vencimento: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            field: "pag_vencimento",
            validate: {
                min: 1,
            },
        }
    },
    {
        tableName: "pagamentos",
        createdAt: "pag_created_at",
        updatedAt: "pag_updated_at",
    }
);

module.exports = Pagamento;