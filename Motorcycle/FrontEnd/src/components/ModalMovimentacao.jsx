import React from 'react'
import usePost from '../hooks/usePost'
import useGet from '../hooks/useGet'
import { useState, useEffect } from 'react'

const ModalMovimentacao = ({ open, onClose, onMovimentacaoCadastrada }) => {

    const { dados: produtos } = useGet("http://localhost:3000/api/produto");

    const [dados, setDados] = useState({
        produtoId: "",
        tipo: "entrada",
        quantidade: 1,
        data: new Date().toISOString().split("T")[0],
        observacao: "",
    });

    const { enviarDados, loading, erro } = usePost();

    useEffect(() => {
        if (open) {
            setDados({
                produtoId: "",
                tipo: "entrada",
                quantidade: 1,
                data: new Date().toISOString().split("T")[0],
                observacao: "",
            });
        }
    }, [open]);

    if (!open) {
        return null;
    };

    const handleChange = (e) => {
        setDados({
            ...dados,
            [e.target.name]: e.target.value,
        })
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const resultado = await enviarDados(
            "http://localhost:3000/api/movimentacao",
            dados,
            "POST"
        );
        console.log(resultado);

        if (!resultado) {
            return;
        }

        await onMovimentacaoCadastrada();
        onClose();
    };


    return (
        <div className="modal-overlay">
            <div className="modal-categoria">
                <div className="modal-header">
                    <div>
                        <h2>
                            Nova movimentação
                        </h2>

                        <p>
                            Informe os dados da movimentação de estoque.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="modal-close"
                        onClick={onClose}
                        disabled={loading}
                    >
                        ×
                    </button>
                </div>

                <form
                    className="modal-form"
                    onSubmit={handleSubmit}
                >
                    <div className="form-control">
                        <label htmlFor="produtoId">Produto</label>

                        <select
                            id="produtoId"
                            name="produtoId"
                            value={dados.produtoId}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        >
                            <option value="">Selecione um produto</option>

                            {produtos?.map((produto) => (
                                <option
                                    key={produto.id}
                                    value={produto.id}
                                >
                                    {produto.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-control">
                        <label htmlFor="tipo">
                            Tipo da movimentação
                        </label>

                        <select
                            id="tipo"
                            name="tipo"
                            value={dados.tipo}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        >
                            <option value="">
                                Selecione
                            </option>

                            <option value="entrada">
                                Entrada
                            </option>

                            <option value="saida">
                                Saída
                            </option>
                        </select>
                    </div>

                    <div className="form-control">
                        <label htmlFor="quantidade">
                            Quantidade
                        </label>

                        <input
                            type="number"
                            id="quantidade"
                            name="quantidade"
                            value={dados.quantidade}
                            onChange={handleChange}
                            placeholder="Digite a quantidade"
                            min="1"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="data">Data</label>

                        <input
                            type="date"
                            id="data"
                            name="data"
                            value={dados.data}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="observacao">Observação</label>

                        <input
                            type="text"
                            id="observacao"
                            name="observacao"
                            value={dados.observacao}
                            onChange={handleChange}
                            placeholder="Digite uma observação"
                            disabled={loading}
                        />
                    </div>

                    {erro && (
                        <p className="form-error">
                            {erro}
                        </p>
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
                                : "Cadastrar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModalMovimentacao