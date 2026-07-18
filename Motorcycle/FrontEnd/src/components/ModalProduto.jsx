import React from 'react'
import {useState, useEffect } from "react"
import "../../public/css/modalCss/modalProduto.css"

const ModalProduto = ({open, modo, produto, onClose, onProdutoCadastrado}) => {

    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(false);


    const buscarCategorias = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/categoria");
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
        return
      }

      setCategorias(data);
    } catch (error) {
      console.log("Erro ao buscar categorias:", error);
    }
  };


  useEffect(() => {
    if (open) {
      buscarCategorias();
    }
  }, [open]);



  const [dados, setDados] = useState({
    nome: "",
    peso: "",
    categoriaId: "",
    preco: "",
    image: "",
    marca: "",
  });

  const handleChange = (e) => {
    setDados({
      ...dados,
      [e.target.name]: e.target.value
    });
  };



  useEffect(() => {
    if (modo === "editar" && produto) {
      setDados({
        nome: produto.nome || "",
        peso: produto.peso || "",
        categoriaId: produto.categoriaId || "",
        image: produto.image || "",
        preco: produto.preco || "",
        marca: produto.marca || "",
      });

    } else {
      setDados({
        nome: "",
        peso: "",
        categoriaId: "",
        image: "",
        preco: "",
        marca: ""
      });
    };
  }, [produto, modo, open]);



  const salvarProduto = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url =
        modo === "editar"
          ? `http://localhost:3000/api/produto/${produto.id}`
          : "http://localhost:3000/api/produto";

      const method = modo === "editar" ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log("Erro da API:", data.message);
        return;
      }

      setDados({
        nome: "",
        peso: "",
        categoriaId: "",
        image: "",
        preco: "",
      });

      onClose();
      onProdutoCadastrado();

    } catch (error) {
      console.log("Erro ao salvar produto:", error);
    } finally {
      setLoading(false);
    }
  };


  if(!open) return null;




  return (
     <div className="modal-overlay">
      <div className="modal-produto">
        <div className="modal-header">
          <h2>
            {modo === "editar"
              ? "Editar produto"
              : "Cadastrar produto"}
          </h2>

          <button
            type="button"
            className="btn-fechar"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form onSubmit={salvarProduto}>
          <div className="form-control">
            <label htmlFor="nome">Nome</label>

            <input
              type="text"
              id="nome"
              name="nome"
              value={dados.nome}
              onChange={handleChange}
              placeholder="Digite o nome do produto"
              required
            />
          </div>

          <div className="form-control">
            <label htmlFor="peso">Peso</label>

            <input
              type="text"
              id="peso"
              name="peso"
              value={dados.peso}
              onChange={handleChange}
              placeholder="Exemplo: 190 kg"
              required
            />
          </div>

          <div className="form-control">
            <label htmlFor="peso">Marca</label>

            <input
              type="text"
              id="marca"
              name="marca"
              value={dados.marca}
              onChange={handleChange}
              placeholder="Oggi"
              required
            />
          </div>


          <div className="form-control">
            <label htmlFor="preco">Preço</label>

            <input
              type="number"
              id="preco"
              name="preco"
              value={dados.preco}
              onChange={handleChange}
              placeholder="Digite o preço"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-control">
            <label htmlFor="image">Link da imagem</label>

            <input
              type="url"
              id="image"
              name="image"
              value={dados.image}
              onChange={handleChange}
              placeholder="https://exemplo.com/imagem.jpg"
              required
            />
          </div>

          <div className="form-control">
            <label htmlFor="categoriaId">Categoria</label>

            <select
              id="categoriaId"
              name="categoriaId"
              value={dados.categoriaId}
              onChange={handleChange}
              required
            >
              <option value="">Selecione uma categoria</option>

              {categorias.map((categoria) => (
                <option
                  key={categoria.id}
                  value={categoria.id}
                >
                  {categoria.nome}
                </option>
              ))}
            </select>
          </div>


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
                  ? "Salvar alterações"
                  : "Cadastrar produto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModalProduto