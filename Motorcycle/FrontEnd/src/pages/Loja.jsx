import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import useGet from "../hooks/useGet"
import "../../public/css/pagesCss/loja.css";

const Loja = () => {
  const navigate = useNavigate();
  
  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );

  const logout = () => {
    const confirmExit = window.confirm(
      "Deseja realmente sair?"
    );
    if (!confirmExit) return;

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    navigate("/");
  };

  const [busca, setBusca] = useState("");
  const { dados: produtos, erro, loading, buscarDados } = useGet("http://localhost:3000/api/produto")


  useEffect(() => {
    buscarDados();
  }, []);

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <main className="loja-page">
      <section className="loja-banner">
        <div className="loja-banner-content">
          <span className="loja-banner-subtitle">
            Sua próxima aventura começa aqui
          </span>

          <h1>Encontre a bicicleta perfeita para você</h1>

          <p>
            Bicicletas para cidade, trilhas e grandes aventuras, com qualidade
            e desempenho para todos os estilos.
          </p>

          <a href="#bicicletas" className="loja-banner-button">
            Ver bicicletas
          </a>
        </div>

        <div className="loja-banner-decoration">
          <span>🚲</span>
        </div>

        <div className="header-user">
          <div className="user-info">
            <span>{usuario?.nome || "Usuário"}</span>
            <small>{usuario?.role || "user"}</small>
          </div>

          <button
            type="button"
            className="logout-button"
            onClick={logout}
          >
            Sair
          </button>
        </div>
      </section>

      <section className="loja-content" id="bicicletas">
        <div className="loja-header">
          <div>
            <span className="loja-section-subtitle">Nossos produtos</span>
            <h2>Bicicletas disponíveis</h2>
          </div>

          <div className="loja-search">
            <input
              type="text"
              placeholder="Buscar bicicleta..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </div>

        {loading && (
          <div className="loja-message">
            <div className="loja-spinner"></div>
            <p>Carregando bicicletas...</p>
          </div>
        )}

        {erro && (
          <div className="loja-message loja-error">
            <p>{erro}</p>
            <button onClick={buscarDados}>Tentar novamente</button>
          </div>
        )}

        {!loading && !erro && produtosFiltrados.length === 0 && (
          <div className="loja-message">
            <p>Nenhuma bicicleta encontrada.</p>
          </div>
        )}

        {!loading && !erro && produtosFiltrados.length > 0 && (
          <div className="loja-grid">
            {produtosFiltrados.map((produto) => (
              <article className="bike-card" key={produto.id}>
                <div className="bike-image-container">
                  <span
                    className={`bike-stock ${produto.estoque > 0 ? "disponivel" : "indisponivel"
                      }`}
                  >
                    {produto.estoque > 0
                      ? `${produto.estoque} em estoque`
                      : "Indisponível"}
                  </span>

                  <img
                    src={produto.image}
                    alt={produto.nome}
                    className="bike-image"
                  />
                </div>

                <div className="bike-content">
                  <span className="bike-category">
                    {produto.Categoria?.nome ||
                      produto.categoria?.nome ||
                      "Bicicleta"}
                  </span>

                  <h3>{produto.nome}</h3>

                  <div className="bike-information">
                    <div>
                      <span>Marca</span>
                      <strong>{produto.marca}</strong>
                    </div>

                    <div>
                      <span>Peso</span>
                      <strong>{produto.peso}</strong>
                    </div>
                  </div>

                  <div className="bike-card-footer">
                    <div className="bike-price">
                      <span>A partir de</span>
                      <strong>
                        {Number(produto.preco).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </strong>
                    </div>

                    <button
                      className="bike-button"
                      disabled={produto.estoque <= 0}
                      onClick={() => navigate(`/detalhes/${produto.id}`)}
                    >
                      {produto.estoque > 0 ? "Ver detalhes" : "Sem estoque"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="loja-benefits">
        <div className="benefit-card">
          <span className="benefit-icon">🚚</span>
          <div>
            <h3>Entrega segura</h3>
            <p>Receba sua bicicleta com segurança e comodidade.</p>
          </div>
        </div>

        <div className="benefit-card">
          <span className="benefit-icon">🛠️</span>
          <div>
            <h3>Produtos revisados</h3>
            <p>Todas as bicicletas passam por uma revisão completa.</p>
          </div>
        </div>

        <div className="benefit-card">
          <span className="benefit-icon">🔒</span>
          <div>
            <h3>Compra protegida</h3>
            <p>Seus dados e pagamentos ficam sempre protegidos.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Loja;