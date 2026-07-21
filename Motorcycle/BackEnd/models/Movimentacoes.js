const { DataTypes } = require('sequelize');
const conn = require("../db/mysql");

const Movimentacoes = conn.define('movimentacoes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'mov_id'
    },
    tipo: {
        type: DataTypes.ENUM("entrada", "saida"),
        allowNull: false,
        field: 'mov_tipo'
      },
  
      quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
        field: 'mov_quantidade'
      },
  
      data: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'mov_data'
      },
  
      observacao: {
        type: DataTypes.STRING(200),
        allowNull: true,
        field: 'mov_observacao'
      },

      produtoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'mov_produto_id',
      }
    },
    {
      tableName: "movimentacoes",
      timestamps: false,
    }
)

module.exports = Movimentacoes;