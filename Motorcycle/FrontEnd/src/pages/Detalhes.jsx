import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGet from "../hooks/useGet";
import "../../public/css/pagesCss/detalhes.css";

const Detalhes = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quantidade, setQuantidade] = useState(1);

    const {
        dados: produto,
        loading,
        erro,
        buscarDados,
    } = useGet(`http://localhost:3000/api/produto/${id}`);

    useEffect(() => {
        buscarDados();
    }, [id]);

    const preco = Number(produto.preco);

    const aumentar = () => {
        if (quantidade < produto.estoque) {
            setQuantidade(quantidade + 1);
        }
    };

    const diminuir = () => {
        if (quantidade > 1) {
            setQuantidade(quantidade - 1);
        }
    };

    const adicionarCarrinho = () => {
        alert(`${quantidade} unidade(s) adicionada(s) ao carrinho`);
    };

    return (
        <main className="details-page">

            {loading ? (
                <p className="details-message">
                    Carregando produto...
                </p>
            ) : erro || !produto?.id ? (
                <div className="details-message">
                    <p>{erro || "Produto não encontrado"}</p>

                    <button onClick={() => navigate("/loja")}>
                        Voltar para a loja
                    </button>
                </div>
            ) : (

                <section className="details-container">
                    <button
                        className="details-back"
                        onClick={() => navigate("/loja")}
                    >
                        ← Voltar para a loja
                    </button>

                    <div className="details-product">
                        <div className="details-image-area">
                            <span className="details-stock">
                                {produto.estoque} em estoque
                            </span>

                            <img
                                src={produto.image}
                                alt={produto.nome}
                                className="details-image"
                            />
                        </div>

                        <div className="details-content">
                            <span className="details-category">
                                {produto.Categoria?.nome || "Bicicleta"}
                            </span>

                            <h1>{produto.nome}</h1>

                            <div className="details-information">
                                <p>
                                    Marca: <strong>{produto.marca}</strong>
                                </p>

                                <p>
                                    Peso: <strong>{produto.peso}</strong>
                                </p>
                            </div>

                            <div className="details-price">
                                {preco.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                })}
                            </div>

                            <div className="details-purchase">
                                <div className="details-quantity">
                                    <button
                                        onClick={diminuir}
                                        disabled={quantidade === 1}
                                    >
                                        −
                                    </button>

                                    <span className="number-color">{quantidade}</span>

                                    <button
                                        onClick={aumentar}
                                        disabled={quantidade === produto.estoque}
                                    >
                                        +
                                    </button>
                                </div>

                                <strong>
                                    Total:{" "}
                                    {(preco * quantidade).toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    })}
                                </strong>
                            </div>

                            <button
                                className="details-buy-button"
                                onClick={adicionarCarrinho}
                            >
                                Adicionar ao carrinho
                            </button>
                        </div>
                    </div>


                    <div className="details-guarantees">
                        <div className="guarantee-card">
                            <span className="guarantee-icon">🚚</span>

                            <div>
                                <h3>Entrega para todo o Brasil</h3>
                                <p>Receba sua bicicleta com rapidez e segurança.</p>
                            </div>
                        </div>

                        <div className="guarantee-card">
                            <span className="guarantee-icon">🛠️</span>

                            <div>
                                <h3>Garantia de 12 meses</h3>
                                <p>Produtos com garantia contra defeitos de fabricação.</p>
                            </div>
                        </div>

                        <div className="guarantee-card">
                            <span className="guarantee-icon">🔒</span>

                            <div>
                                <h3>Compra 100% segura</h3>
                                <p>Seus dados são protegidos durante toda a compra.</p>
                            </div>
                        </div>
                    </div>
                </section>
            )};

        </main>
    );
};

export default Detalhes;