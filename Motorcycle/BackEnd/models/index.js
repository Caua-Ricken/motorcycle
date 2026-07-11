const Categoria = require('./Categoria');
const Produto = require('./Produtos');
const Usuario = require('./Usuario');

//categoria
Produto.belongsTo(Categoria, {
  foreignKey: {
    name: "categoriaId",
    field: "pro_categoria_id",
  },
});

Categoria.hasMany(Produto, {
  foreignKey: {
    name: "categoriaId",
    field: "pro_categoria_id",
  },
});

module.exports = {
    Categoria,
    Produto,
    Usuario
};