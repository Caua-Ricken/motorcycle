const Categoria = require('./Categoria');
const Produto = require('./Produtos');
const Usuario = require('./Usuario');
const Movimentacoes = require('./Movimentacoes');

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

//movimentacao
  Movimentacoes.belongsTo(Produto, {
    foreignKey: {
      name: "produtoId",
      field: "mov_produto_id",
    },
  });
  
  Produto.hasMany(Movimentacoes, {
    foreignKey: {
      name: "produtoId",
      field: "mov_produto_id",
    },
  });

module.exports = {
    Categoria,
    Produto,
    Usuario,
    Movimentacoes
};