import React from "react";
import { useCarrinhoContext } from "../hooks/useCarrinhoContext";
import "../../public/css/pagesCss/carrinho.css";

const Carrinho = () => {
  const {
    carrinho,
    removerCarrinho,
    limparCarrinho,
  } = useCarrinhoContext();

  const total = carrinho.reduce((acc, item) => {
    return acc + Number(item.preco) * item.quantidade;
  }, 0);

  return (
    <main className="cart-page">
      <div className="cart-container">
        <h1>Meu Carrinho</h1>

        {carrinho.length === 0 ? (
          <div className="cart-empty">
            <h2>Seu carrinho está vazio</h2>
            <p>Adicione algumas bicicletas para começar.</p>
          </div>
        ) : (
          <>
            <div className="cart-products">
              {carrinho.map((item) => (
                <div className="cart-card" key={item.id}>
                  <img src={item.image} alt={item.nome} />

                  <div className="cart-info">
                    <h3>{item.nome}</h3>

                    <p>Marca: {item.marca}</p>

                    <p>
                      Quantidade:
                      <strong> {item.quantidade}</strong>
                    </p>

                    <p>
                      Valor Unitário:
                      <strong>
                        {" "}
                        {Number(item.preco).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </strong>
                    </p>

                    <p>
                      Subtotal:
                      <strong>
                        {" "}
                        {(Number(item.preco) * item.quantidade).toLocaleString(
                          "pt-BR",
                          {
                            style: "currency",
                            currency: "BRL",
                          }
                        )}
                      </strong>
                    </p>
                  </div>

                  <button
                    className="btn-remove"
                    onClick={() => removerCarrinho(item.id)}
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <h2>
                Total:
                <span>
                  {total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </h2>

              <div className="cart-buttons">
                <button
                  className="btn-clear"
                  onClick={limparCarrinho}
                >
                  Limpar Carrinho
                </button>

                <button className="btn-buy">
                  Finalizar Compra
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Carrinho;