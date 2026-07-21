import React from 'react'
import { useState, useEffect } from 'react'
import useGet from "../hooks/useGet"
import ModalMovimentacao from '../components/ModalMovimentacao'
import "../../public/css/pagesCss/cadastroMovimentacao.css"

const CadastroMovimentacao = () => {
    const { dados: movimentacoes, loading, erro, buscarDados } = useGet("http://localhost:3000/api/movimentacao");

    const [open, setOpen] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const deleteMovimentacao = async (id) => {
        const confirmDelete = window.confirm(
            "Deseja realmente excluir esta movimentação?"
        );

        if (!confirmDelete) return;
        setLoadingDelete(true);

        try {
            const res = await fetch(`http://localhost:3000/api/movimentacao/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();

            if (!res.ok) {
                alert(data.message)
            }

            alert(data.message)
        } catch (error) {
            console.error("Erro ao deletar movimentação:", error);
        } finally {
            setLoadingDelete(false);
            buscarDados();
        }
    };

    return (
        <div className="movimentacao-page">
            <div className="movimentacao-header">
                <h1>Movimentações</h1>

                <button
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    Nova movimentação
                </button>
            </div>

            {loading && <p>Carregando...</p>}

            {erro && <p>{erro}</p>}

            {!loading && !erro && (
                <table className="movimentacao-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Produto</th>
                            <th>Tipo</th>
                            <th>Quantidade</th>
                            <th>Data</th>
                            <th>Observações</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {movimentacoes.length === 0 ? (
                            <tr>
                                <td colSpan={7}>Nenhuma movimentação cadastrada.</td>
                            </tr>
                        ) : (
                            movimentacoes.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.Produto?.nome}</td>
                                    <td>{item.tipo}</td>
                                    <td>{item.quantidade}</td>
                                    <td>{item.data}</td>
                                    <td>{item.observacao}</td>

                                    <td>
                                        <button onClick={() => deleteMovimentacao(item.id)}>
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}

            {open && (
                <ModalMovimentacao
                    open={open}
                    onClose={() => setOpen(false)}
                    onMovimentacaoCadastrada={buscarDados}
                />
            )}
        </div>
    );
}

export default CadastroMovimentacao