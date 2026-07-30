import React from "react";
import { useCarrinhoContext } from "../hooks/useCarrinhoContext";
import "../../public/css/modalCss/modalCarrinho.css";
import { useNavigate } from "react-router-dom";

const ModalCarrinho = () => {
  const {
    carrinho,
    removerCarrinho,
    limparCarrinho,
  } = useCarrinhoContext();

  const total = carrinho.reduce((acc, item) => {
    return acc + Number(item.preco) * item.quantidade;
  }, 0);

  const navigate = useNavigate();

  return (
    <main className="cart-page">
  <div className="cart-container">
    <h1>Meu Carrinho</h1>

    {carrinho.length === 0 ? (
      <div className="cart-empty">
        <h2 className="cart-words">Seu carrinho está vazio</h2>
        <p className="cart-words">Adicione algumas bicicletas para começar.</p>
      </div>
    ) : (
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
                Valor unitário:
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
    )}

    <div className="cart-footer">
      <h2>
        Total:
        <span>
          {" "}
          {total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </h2>

      <div className="cart-buttons">
        <button
          className="btn-voltar-loja"
          onClick={() => navigate("/loja")}
        >
          Voltar à loja
        </button>

        <button
          className="btn-clear"
          onClick={limparCarrinho}
          disabled={carrinho.length === 0}
        >
          Limpar carrinho
        </button>

        <button
          className="btn-buy"
          onClick={() => navigate("/loja/carrinho/pagamento")}
          disabled={carrinho.length === 0}
        >
          Avançar para pagamento
        </button>
      </div>
    </div>
  </div>
</main>
  );
};

export default ModalCarrinho;