import "../../public/css/modalCss/modalSaida.css";

const ModalSaida = ({
  open,
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  return (
    <div className="modal-saida-overlay">
      <div className="modal-saida">
        <h2>Sair da conta</h2>

        <p>Deseja realmente sair do sistema?</p>

        <div className="modal-saida-buttons">
          <button
            type="button"
            className="btn-cancelar"
            onClick={onCancel}
          >
            Cancelar
          </button>

          <button
            type="button"
            className="btn-sair"
            onClick={onConfirm}
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSaida;