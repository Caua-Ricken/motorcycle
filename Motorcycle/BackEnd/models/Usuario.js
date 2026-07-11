const { DataTypes } = require("sequelize");
const conn = require("../db/mysql");

const Usuario = conn.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "usu_id",
    },

    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "usu_nome",
    },

    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
      field: "usu_email",
    },

    senha: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "usu_senha",
    },

    role: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false,
      defaultValue: "user",
      field: "usu_role",
    },
  },
  {
    tableName: "usuarios",

    createdAt: "usu_created_at",
    updatedAt: "usu_updated_at",
  }
);

module.exports = Usuario;