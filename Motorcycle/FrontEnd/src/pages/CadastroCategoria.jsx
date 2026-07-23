import { useEffect, useState } from "react";
import "../../public/css/pagesCss/cadastroCategoria.css";
import ModalCategoria from "../components/ModalCategoria";
import useGet from "../hooks/useGet"

const CadastroCategoria = () => {
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");

    const [open, setOpen] = useState(false);
    const [categoria, setCategoria] = useState("");
    const [modo, setModo] = useState("");

    const {dados: categorias, buscarDados} = useGet("http://localhost:3000/api/categoria");


    useEffect(() => {
        buscarDados();
    }, []);


    const deletarCategoria = async (id) => {
        const confirmDelete = window.confirm(
            "Deseja realmente excluir esta movimentação?"
        );

        if (!confirmDelete) return;
        setLoading(true);

        try {
            const res = await fetch(`http://localhost:3000/api/categoria/${id}`, {
                method: 'DELETE'
            });
            const data = await res.json();

            if (!res.ok) {
                alert(data.message);
                return;
            };

            alert(data.message);

            buscarDados();

        } catch (error) {
            console.log(error);
            setErro(error.message);
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="categoria-page">
            <div className="categoria-header">
                <div className="categoria-title">
                    <h2>Categorias</h2>
                    <p>Cadastre e gerencie as categorias dos produtos.</p>
                </div>

                <button className="btn-cadastrar" onClick={() => { setOpen(true), setModo("criar") }}>
                    + Cadastrar categoria
                </button>
            </div>

            <div className="lista-categorias">
                {categorias.map((categoria) => (
                    <div className="categoria-item" key={categoria.id}>
                        <div className="categoria-info">
                            <h3>{categoria.nome}</h3>
                        </div>

                        {erro && <span className="form-error">{erro}</span>}

                        <div className="acoes">
                            <button className="btn-editar" onClick={() => { setModo("editar"), setOpen(true), setCategoria(categoria) }}>Editar</button>
                            <button className="btn-deletar" onClick={() => deletarCategoria(categoria.id)}>Deletar</button>
                        </div>
                    </div>
                ))}
            </div>
            <ModalCategoria open={open} onClose={() => setOpen(false)} modo={modo} categoria={categoria} onSalvar={buscarDados} />
        </div>
    );
};

export default CadastroCategoria;