import React from 'react'
import { useState, useEffect } from "react";
import ModalProduto from '../components/ModalProduto';
import "../../public/css/pagesCss/cadastroProduto.css"

const CadastroProduto = () => {

  const [open, setOpen] = useState(false);
  const [produto, setProduto] = useState(null);
  const [modo, setModo] = useState("");

  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState([]);


  useEffect(() => {
    buscarProdutos();
  }, []);


  const buscarProdutos = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/produto");
      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }
      console.log(data)
      setProdutos(data);

    } catch (error) {
      console.log("erro ao carregar dados:", error)

    } finally {
      setLoading(false)
    }
  }

  const deletarProduto = async (id) => {
    const confirmDelete = window.confirm(
      "Deseja realmente excluir esta movimentação?"
    );

    if (!confirmDelete) return;
    setLoading(true)

    try {
      const res = await fetch(`http://localhost:3000/api/produto/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }
      alert(data.message);

      buscarProdutos();

    } catch (error) {
      console.log("erro ao carregar dados:", error)

    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="container">

      <div className="topo">
        <button
          onClick={() => {
            setModo("cadastrar");
            setProduto(null);
            setOpen(true);
          }}
        >
          + Cadastrar Produto
        </button>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="cards">
          {produtos.map((item) => (
            <div className="card" key={item.id}>

              <img
                src={item.image}
                alt={item.nome}
                className="imagem"
              />

              <h2>{item.nome}</h2>

              <p><strong>Marca:</strong> {item.marca}</p>
              <p><strong>Peso:</strong> {item.peso}</p>
              <p><strong>Preço:</strong> R$ {item.preco}</p>
              <p><strong>Estoque:</strong> {item.estoque}</p>

              <p>
                <strong>Categoria:</strong>{" "}
                {item.Categorium?.nome}
              </p>

              <div className="acoes">
                <button
                  onClick={() => {
                    setModo("editar");
                    setProduto(item);
                    setOpen(true);
                  }}
                >
                  Editar
                </button>

                <button
                  onClick={() => deletarProduto(item.id)}
                >
                  Deletar
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      <ModalProduto open={open} onClose={() => setOpen(false)} produto={produto} modo={modo} onProdutoCadastrado={buscarProdutos} />

    </div>
  )
}

export default CadastroProduto