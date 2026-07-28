import React from 'react'
import { useState, useEffect } from 'react'
import "../../public/css/modalCss/modalPagamento.css"

const ModalCadastroPagamento = ({ open, modo, pagamento, onClose, onPagamentoSalvo }) => {
  const [form, setForm] = useState({
    nome: "",
    tipo: "",
    descricao: "",
    parcelasMaxima: "",
    vencimento: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setErro] = useState("");

  useEffect(() => {
    if (!open) return;

    if (modo === "editar" && pagamento) {
      setForm({
        nome: pagamento.nome || "",
        tipo: pagamento.tipo || "",
        descricao: pagamento.descricao || "",
        parcelasMaxima: pagamento.parcelasMaxima || "",
        vencimento: pagamento.vencimento || ""
      });

    } else {
      setForm({
        nome: "",
        tipo: "",
        descricao: "",
        parcelasMaxima: "",
        vencimento: ""
      });
    }

    setErro("");
  }, [open, modo, pagamento]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };


  const salvarPagamento = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url =
        modo === "editar"
          ? `http://localhost:3000/api/pagamento/${pagamento.id}`
          : "http://localhost:3000/api/pagamento";

      const method = modo === "editar" ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log("Erro da API:", data.message);
        setErro(data.message);
        return;
      }

      setForm({
        nome: "",
        tipo: "",
        descricao: "",
        parcelasMaxima: "",
        vencimento: ""
      });

      onClose();
      onPagamentoSalvo();

    } catch (error) {
      console.log("Erro ao salvar produto:", error);
      setErro(error);
    } finally {
      setLoading(false);
    }
  };


  return (
  <div className="modal-overlay">
    <div className="modal-pagamento">
      <div className="modal-header">
        <div>
          <h2>
            {modo === "editar"
              ? "Editar pagamento"
              : "Cadastrar pagamento"}
          </h2>

          <p>Preencha os dados da forma de pagamento.</p>
        </div>

        <button
          type="button"
          className="btn-fechar"
          onClick={onClose}
        >
          ×
        </button>
      </div>

      <form onSubmit={salvarPagamento}>
        <div className="form-control">
          <label htmlFor="nome">Nome</label>

          <input
            id="nome"
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            placeholder="Ex: Cartão Nubank"
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="tipo">Tipo</label>

          <select
            id="tipo"
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            <option value="pix">Pix</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
            <option value="boleto">Boleto</option>
            <option value="dinheiro">Dinheiro</option>
          </select>
        </div>

        <div className="form-control">
          <label htmlFor="descricao">Descrição</label>

          <textarea
            id="descricao"
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            placeholder="Descrição da forma de pagamento"
          />
        </div>

        {form.tipo === "credito" && (
          <div className="form-control">
            <label htmlFor="parcelasMaxima">
              Parcelas máximas
            </label>

            <input
              id="parcelasMaxima"
              type="number"
              name="parcelasMaxima"
              value={form.parcelasMaxima}
              onChange={handleChange}
              min="1"
              placeholder="Ex: 12"
              required
            />
          </div>
        )}

        {form.tipo === "boleto" && (
          <div className="form-control">
            <label htmlFor="vencimento">
              Vencimento em dias
            </label>

            <input
              id="vencimento"
              type="number"
              name="vencimento"
              value={form.vencimento}
              onChange={handleChange}
              min="1"
              placeholder="Ex: 30"
              required
            />
          </div>
        )}

        {error && (
          <p className="modal-error">{error}</p>
        )}

        <div className="modal-actions">
          <button
            type="button"
            className="btn-cancelar"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="btn-salvar"
            disabled={loading}
          >
            {loading
              ? "Salvando..."
              : modo === "editar"
                ? "Atualizar"
                : "Cadastrar"}
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default ModalCadastroPagamento