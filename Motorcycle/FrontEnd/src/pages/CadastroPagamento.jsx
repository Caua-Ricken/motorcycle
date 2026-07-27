import { useEffect, useState } from "react";
import useGet from "../hooks/useGet";
import usePost from "../hooks/usePost"
import "../../public/css/pagesCss/cadastroPagamento.css"

const CadastroPagamento = () => {
    const [open, setOpen] = useState(false);
    const [modo, setModo] = useState("cadastrar");
    const [pagamentoSelecionado, setPagamentoSelecionado] = useState(null);

    const {
        dados: pagamentos,
        loading,
        erro,
        buscarDados,
    } = useGet("http://localhost:3000/api/pagamento");

    useEffect(() => {
        buscarDados();
    }, []);

    const {
        enviarDados
    } = usePost();


    const excluirPagamento = async (pagamento) => {
        const confirmar = window.confirm(
            `Deseja realmente excluir a forma de pagamento "${pagamento.nome}"?`
        );

        if (!confirmar) return;

        const resposta = await enviarDados(
            `http://localhost:3000/api/pagamento/${pagamento.id}`,
            null,
            "DELETE"
        );

        if (resposta) {
            buscarDados();
        }
    };


    const alterarStatus = async (pagamento) => {
        const resposta = await enviarDados(
            `http://localhost:3000/api/pagamento/${pagamento.id}`,
            {
                ativo: !pagamento.ativo,
            },
            "PUT"
        );

        if (resposta) {
            buscarDados();
        }
    };

    return (
        <main className="payment-page">
            <div className="payment-container">
                <div className="payment-header">
                    <div>
                        <h1>Formas de pagamento</h1>
                        <p>Cadastre e gerencie as formas de pagamento da loja.</p>
                    </div>

                    <button
                        type="button"
                        className="btn-new-payment"
                        onClick={() => { setModo("criar"), setOpen(true) }}
                    >
                        + Cadastrar
                    </button>
                </div>

                {loading && (
                    <p className="payment-message">
                        Carregando formas de pagamento...
                    </p>
                )}

                {erro && (
                    <p className="payment-message payment-error">
                        {erro}
                    </p>
                )}

                {!loading && !erro && (
                    pagamentos?.length === 0 ? (
                        <div className="payment-empty">
                            <h2>Nenhuma forma de pagamento cadastrada</h2>
                            <p>Clique em cadastrar para adicionar a primeira.</p>
                        </div>
                    ) : (
                        <table className="payment-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Descrição</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {pagamentos.map((pagamento) => (
                                    <tr key={pagamento.id}>
                                        <td>{pagamento.id}</td>

                                        <td>
                                            <strong>{pagamento.nome}</strong>
                                        </td>

                                        <td>
                                            {pagamento.descricao || "Sem descrição"}
                                        </td>

                                        <td>
                                            <span
                                                className={
                                                    pagamento.ativo
                                                        ? "status active"
                                                        : "status inactive"
                                                }
                                            >
                                                {pagamento.ativo ? "Ativo" : "Inativo"}
                                            </span>
                                        </td>

                                        <td>
                                            <div className="payment-actions">
                                                <button
                                                    type="button"
                                                    className="btn-edit-payment"
                                                    onClick={() => {
                                                        setOpen(true);
                                                        setModo("editar");
                                                        setPagamentoSelecionado(pagamento);
                                                    }}
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                    className={
                                                        pagamento.ativo
                                                            ? "btn-disable-payment"
                                                            : "btn-enable-payment"
                                                    }
                                                    onClick={() => alterarStatus(pagamento)}
                                                >
                                                    {pagamento.ativo ? "Desativar" : "Ativar"}
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn-delete-payment"
                                                    onClick={() => excluirPagamento(pagamento)}
                                                >
                                                    Excluir
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                )}

            </div>
        </main>
    );
};

export default CadastroPagamento;