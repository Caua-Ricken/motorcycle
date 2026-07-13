import { useEffect, useState } from "react";
import "../../public/css/modalCss/modalCategoria.css";

const ModalCategoria = ({
  open,
  categoria,
  modo,
  onClose,
  onSalvar,
}) => {
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!open) return;

    if (modo === "editar" && categoria) {
      setNome(categoria.nome || "");
    } else {
      setNome("");
    }

    setErro("");
  }, [open, modo, categoria]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome) {
      setErro("Informe o nome da categoria.");
      return;
    }

    try {
      setLoading(true);
      setErro("");

      const url =
        modo === "editar"
          ? `http://localhost:3000/api/categoria/${categoria.id}`
          : "http://localhost:3000/api/categoria";

      const method = modo === "editar" ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
          data.error ||
          "Erro ao salvar categoria"
        );
      }

      setNome("");

      await onSalvar();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fecharModal = () => {
    if (loading) return;

    setErro("");
    onClose();
  };

  const titulo =
    modo === "editar"
      ? "Editar categoria"
      : "Cadastrar categoria";

  const textoBotao =
    modo === "editar"
      ? "Salvar alterações"
      : "Cadastrar categoria";

  return (
    <div className="modal-overlay" onMouseDown={fecharModal}>
      <div
        className="modal-categoria"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h2>{titulo}</h2>

            <p>
              {modo === "editar"
                ? "Altere o nome da categoria selecionada."
                : "Informe o nome da nova categoria."}
            </p>
          </div>

          <button
            type="button"
            className="modal-close"
            onClick={fecharModal}
            disabled={loading}
          >
            ×
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="nome">Nome da categoria</label>

            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Ex.: Esportivas"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              autoFocus
              disabled={loading}
            />

            {erro && <span className="form-error">{erro}</span>}
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn-cancelar"
              onClick={fecharModal}
              disabled={loading}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="btn-salvar"
              disabled={loading}
            >
              {loading ? "Salvando..." : textoBotao}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCategoria;