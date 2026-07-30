import React from "react";
import { useNavigate } from "react-router-dom";
import useGet from "../hooks/useGet"
import { useState, useEffect } from 'react'
import "../../public/css/modalCss/modalRecebimento.css"

const ModalPagamento = () => {
  const [pagamentoSelecionado, setpagamentoSelecionado] = useState(null);
  const [quantidadeParcelas, setQuantidadeParcelas] = useState(1);

  const {
    dados,
    buscarDados
  } = useGet("http://localhost:3000/api/pagamento/ativo");


  const selecionarForma = (e) => {
    const forma = dados.find((item) => item.id === Number(e.target.value));

    setpagamentoSelecionado(forma);
  }


  const opcoesParcelas = [];

  if (pagamentoSelecionado) {
    for (
      let i = 1; i <= pagamentoSelecionado.parcelasMaxima; i++) {
      opcoesParcelas.push(
        <option key={i} value={i}>
          {i}x
        </option>
      );
    }
  };

  const finalizar = () => {
    localStorage.setItem(
      "formaPagamento",
      JSON.stringify({
        ...pagamentoSelecionado,
        quantidadeParcelas,
      })
    );

    navigate("/loja/carrinho/conclusao");
  };


  const navigate = useNavigate();

  return (
    <main className="pagamento-container">
      <div className="pagamento-card">
        <h2>Pagamento</h2>

        <label>Forma de pagamento</label>

        <select defaultValue="" onChange={selecionarForma}>
          <option value="">Selecione</option>

          {dados.map((forma) => (
            <option key={forma.id} value={forma.id}>
              {forma.nome}
            </option>
          ))}
        </select>

        {pagamentoSelecionado?.tipo === "credito" && (
          <>
            <label>Quantidade de parcelas</label>

            <select
              value={quantidadeParcelas}
              onChange={(e) => setQuantidadeParcelas(Number(e.target.value))}>
              {opcoesParcelas}
            </select>
          </>
        )}

        <div className="pagamento-botoes">
          <button
            className="btn-voltar"
            onClick={() => navigate("/loja/carrinho")}
          >
            Voltar ao carrinho
          </button>

          <button
            className="btn-finalizar"
            onClick={finalizar}
            disabled={!pagamentoSelecionado}
          >
            Finalizar
          </button>
        </div>
      </div>
    </main>
  );
}

export default ModalPagamento