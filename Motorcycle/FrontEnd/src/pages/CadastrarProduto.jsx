import { useState } from "react";
import "../../public/css/pagesCss/cadastroProduto.css";

function CadastrarProduto() {
  const [dados, setDados] = useState({
    nome: "",
    peso: "",
    hp: "",
    preco: "",
    marca: "",
    imagem: "",
    categoriaId: "",
  });

  const handleChange = (e) => {
    setDados({
      ...dados,
      [e.target.name]: e.target.value,
    });
  };

  const cadastrarProduto = async (e) => {
    e.preventDefault();

    console.log(dados);

    // Aqui ficará o fetch futuramente
  };

  return (
    <section className="produto-page">
      <div className="produto-card">

        <div className="produto-header">
          <span>🏍️ MOTORCYCLE</span>

          <h1>Cadastrar Moto</h1>

          <p>
            Informe os dados da motocicleta para adicioná-la ao catálogo.
          </p>
        </div>

        <form
          className="produto-form"
          onSubmit={cadastrarProduto}
        >

          <div className="form-control">
            <label>Nome</label>

            <input
              type="text"
              name="nome"
              value={dados.nome}
              onChange={handleChange}
              placeholder="Ex.: Yamaha MT-07"
              required
            />
          </div>

          <div className="form-control">
            <label>Marca</label>

            <input
              type="text"
              name="marca"
              value={dados.marca}
              onChange={handleChange}
              placeholder="Ex.: Yamaha"
              required
            />
          </div>

          <div className="form-control">
            <label>Peso (kg)</label>

            <input
              type="number"
              name="peso"
              value={dados.peso}
              onChange={handleChange}
              placeholder="184"
              required
            />
          </div>

          <div className="form-control">
            <label>HP</label>

            <input
              type="number"
              name="hp"
              value={dados.hp}
              onChange={handleChange}
              placeholder="74"
              required
            />
          </div>

          <div className="form-control">
            <label>Preço</label>

            <input
              type="number"
              step="0.01"
              name="preco"
              value={dados.preco}
              onChange={handleChange}
              placeholder="57990"
              required
            />
          </div>

          <div className="form-control">
            <label>Categoria</label>

            <select
              name="categoriaId"
              value={dados.categoriaId}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>

              {/* Depois carregar do banco */}
              <option value="1">Naked</option>
              <option value="2">Sport</option>
              <option value="3">Trail</option>
              <option value="4">Custom</option>
            </select>
          </div>

          <div className="form-control full-width">
            <label>Imagem</label>

            <input
              type="text"
              name="imagem"
              value={dados.imagem}
              onChange={handleChange}
              placeholder="https://..."
              required
            />
          </div>

          <button type="submit">
            Cadastrar Moto
          </button>

        </form>

      </div>
    </section>
  );
}

export default CadastrarProduto;