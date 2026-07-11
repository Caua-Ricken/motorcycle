const { DataTypes } = require("sequelize");
const conn = require("../db/mysql");

const Categoria = conn.define(
  "Categoria",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "cat_id",
    },

    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "cat_nome",
    },
  },
  {
    tableName: "categorias",
    createdAt: "cat_created_at",
    updatedAt: "cat_updated_at",
  }
);

module.exports = Categoria;