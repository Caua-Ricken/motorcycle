const { DataTypes } = require("sequelize");
const conn = require("../db/mysql");

const Produto = conn.define(
  "Produto",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "pro_id",
    },

    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "pro_nome",
    },

    peso: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: "pro_peso",
    },

    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: "pro_preco",
    },

    marca: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "pro_marca",
    },
    image: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: "pro_image"
    },
    estoque: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'pro_estoque'
    },
    categoriaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'pro_categoria_id',
    }
  },
  {
    tableName: "produtos",
    createdAt: "pro_created_at",
    updatedAt: "pro_updated_at",
  }
);

module.exports = Produto;