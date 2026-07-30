import React from "react";
import { useCarrinhoContext } from "../hooks/useCarrinhoContext";
import { useNavigate } from "react-router-dom";
import "../../public/css/modalCss/modalConclusao.css";

const ModalConclusao = () => {
  const { carrinho, limparCarrinho } = useCarrinhoContext();

  const navigate = useNavigate();

  const formaPagamento = JSON.parse(
    localStorage.getItem("formaPagamento")
  );

  //valor total
  const total = carrinho.reduce((acc, item) => {
    return acc + Number(item.preco) * item.quantidade;
  }, 0);

  //comprovante
  const gerarComprovante = () => {
    let texto = "COMPROVANTE DE COMPRA\n\n";

    texto += "ITENS DA COMPRA\n";
    texto += "--------------------------\n";

    carrinho.forEach((item) => {
      texto += `Produto: ${item.nome}\n`;
      texto += `Marca: ${item.marca}\n`;
      texto += `Quantidade: ${item.quantidade}\n`;
      texto += `Valor unitário: ${Number(item.preco).toLocaleString(
        "pt-BR",
        {
          style: "currency",
          currency: "BRL",
        }
      )}\n`;

      texto += `Subtotal: ${(
        Number(item.preco) * item.quantidade
      ).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}\n`;

      texto += "--------------------------\n";
    });

    texto += `\nForma de pagamento: ${
      formaPagamento?.nome || "Não informada"
    }\n`;

    if (formaPagamento?.tipo === "credito") {
      texto += `Parcelas: ${
        formaPagamento.quantidadeParcelas || 1
      }x\n`;
    }

    if (formaPagamento?.tipo === "boleto") {
      texto += `Dias para vencimento: ${
        formaPagamento.vencimento || 1
      } Dias\n`;
    }

    texto += `\nTotal: ${total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}\n`;

    const arquivo = new Blob([texto], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(arquivo);

    const link = document.createElement("a");

    link.href = url;
    link.download = "comprovante-compra.txt";

    link.click();

    URL.revokeObjectURL(url);
  };

  //post para o BackEnd
  const finalizarCompra = async () => {
    try {
      const itens = carrinho.map((item) => (
        {
          id: item.id,
          quantidade: item.quantidade
        }
      ));

      const res = await fetch("http://localhost:3000/api/produto/finalizar", {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({itens})
      });
      const data = await res.json();

      if(!res.ok) {
        alert(data.message);
        return;
      };

      gerarComprovante();
      limparCarrinho();

      localStorage.removeItem("formaPagamento");
      navigate("/loja")

      alert(data.message);

    } catch (error) {
      console.log(error)
    }
  };

  return (
    <main className="conclusao-container">
      <div className="conclusao-card">
        <h2>Resumo da compra</h2>

        <div className="conclusao-itens">
          {carrinho.map((item) => (
            <div className="conclusao-item" key={item.id}>
              <span>
                {item.nome} - {item.quantidade}x
              </span>

              <strong>
                {(Number(item.preco) * item.quantidade).toLocaleString(
                  "pt-BR",
                  {
                    style: "currency",
                    currency: "BRL",
                  }
                )}
              </strong>
            </div>
          ))}
        </div>

        <div className="conclusao-pagamento">
          <p>
            Forma de pagamento:
            <strong> {formaPagamento?.nome}</strong>
          </p>

          {formaPagamento?.tipo === "credito" && (
            <p>
              Parcelas:
              <strong> {formaPagamento.quantidadeParcelas || 1}x</strong>
            </p>
          )}

          {formaPagamento?.tipo === "boleto" && (
            <p>
                Dias para vencimento:
                <strong> {formaPagamento.vencimento || 1} Dias</strong>
            </p>
          )}
        </div>

        <h3 className="conclusao-total">
          Total:
          <span>
            {total.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </h3>

        <div className="conclusao-botoes">
          <button
            className="btn-voltar-pagamento"
            onClick={() =>
              navigate("/loja/carrinho/pagamento")
            }
          >
            Voltar ao pagamento
          </button>

          <button
            className="btn-confirmar-compra"
            onClick={finalizarCompra}
            disabled={
              carrinho.length === 0 || !formaPagamento
            }
          >
            Confirmar compra
          </button>
        </div>
      </div>
    </main>
  );
};

export default ModalConclusao;