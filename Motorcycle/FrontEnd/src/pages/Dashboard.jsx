import { useEffect } from "react";
import useGet from "../hooks/useGet";
import "../../public/css/pagesCss/dashboard.css";

const Dashboard = () => {
  const {
    dados: produtos,
    erro: erroProdutos,
    loading: loadingProdutos,
    buscarDados: buscarDadosProdutos,
  } = useGet("http://localhost:3000/api/produto");

  const {
    dados: categorias,
    erro: erroCategorias,
    loading: loadingCategorias,
    buscarDados: buscarDadosCategorias,
  } = useGet("http://localhost:3000/api/categoria");

  const {
    dados: usuarios,
    erro: erroUsuarios,
    loading: loadingUsuarios,
    buscarDados: buscarDadosUsuarios,
  } = useGet("http://localhost:3000/api/usuario");

  useEffect(() => {
    buscarDadosProdutos();
    buscarDadosCategorias();
    buscarDadosUsuarios();
  }, []);

  const listaProdutos = Array.isArray(produtos) ? produtos : [];
  const listaCategorias = Array.isArray(categorias) ? categorias : [];
  const listaUsuarios = Array.isArray(usuarios) ? usuarios : [];

  const marcas = [
    ...new Set(
      listaProdutos
        .map((produto) => produto.marca)
        .filter((marca) => marca)
    ),
  ];

  const estoqueTotal = listaProdutos.reduce((total, produto) => {
    return total + Number(produto.estoque || 0);
  }, 0);

  const produtosSemEstoque = listaProdutos.filter((produto) => {
    return Number(produto.estoque) <= 0;
  });

  const carregando =
    loadingProdutos ||
    loadingCategorias ||
    loadingUsuarios;

  const erro =
    erroProdutos ||
    erroCategorias ||
    erroUsuarios;

  const atualizarDashboard = () => {
    buscarDadosProdutos();
    buscarDadosCategorias();
    buscarDadosUsuarios();
  };

  if (carregando) {
    return (
      <div className="dashboard-message">
        Carregando dashboard...
      </div>
    );
  }

  if (erro) {
    return (
      <div className="dashboard-message dashboard-message-error">
        {erro}
      </div>
    );
  }

  return (
    <main className="dashboard">
      <header className="dashboard-top">
        <div>
          <span className="dashboard-label">
            Painel administrativo
          </span>

          <h1>Visão geral da loja</h1>

          <p>
            Acompanhe os principais dados cadastrados no sistema.
          </p>
        </div>

        <button
          type="button"
          className="dashboard-update"
          onClick={atualizarDashboard}
        >
          Atualizar dados
        </button>
      </header>

      <section className="dashboard-summary">
        <article className="summary-card">
          <div className="summary-card-top">
            <span>Produtos</span>
            <span className="summary-number">
              {listaProdutos.length}
            </span>
          </div>

          <p>Total de produtos cadastrados</p>

          <div className="summary-line" />
        </article>

        <article className="summary-card">
          <div className="summary-card-top">
            <span>Categorias</span>
            <span className="summary-number">
              {listaCategorias.length}
            </span>
          </div>

          <p>Categorias disponíveis</p>

          <div className="summary-line" />
        </article>

        <article className="summary-card">
          <div className="summary-card-top">
            <span>Marcas</span>
            <span className="summary-number">
              {marcas.length}
            </span>
          </div>

          <p>Marcas diferentes cadastradas</p>

          <div className="summary-line" />
        </article>

        <article className="summary-card">
          <div className="summary-card-top">
            <span>Usuários</span>
            <span className="summary-number">
              {listaUsuarios.length}
            </span>
          </div>

          <p>Usuários cadastrados</p>

          <div className="summary-line" />
        </article>
      </section>

      <section className="dashboard-content">
        <div className="dashboard-panel">
          <div className="panel-header">
            <div>
              <span>Estoque</span>
              <h2>Resumo dos produtos</h2>
            </div>
          </div>

          <div className="stock-summary">
            <div className="stock-item">
              <span>Unidades em estoque</span>
              <strong>{estoqueTotal}</strong>
            </div>

            <div className="stock-item">
              <span>Produtos disponíveis</span>
              <strong>
                {
                  listaProdutos.filter(
                    (produto) => Number(produto.estoque) > 0
                  ).length
                }
              </strong>
            </div>

            <div className="stock-item stock-item-alert">
              <span>Produtos sem estoque</span>
              <strong>{produtosSemEstoque.length}</strong>
            </div>
          </div>
        </div>

        <div className="dashboard-panel">
          <div className="panel-header">
            <div>
              <span>Catálogo</span>
              <h2>Marcas cadastradas</h2>
            </div>
          </div>

          <div className="brand-list">
            {marcas.length === 0 ? (
              <p className="empty-message">
                Nenhuma marca encontrada.
              </p>
            ) : (
              marcas.map((marca) => (
                <span key={marca} className="brand-item">
                  {marca}
                </span>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;