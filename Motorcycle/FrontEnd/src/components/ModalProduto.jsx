import React from 'react'

const ModalProduto = ({open, modo, produto, onClose, onProdutoCadastrado}) => {

    if(!open) return null;


    const [categorias, setCategorias] = useState([]);

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
  });

  const [loading, setLoading] = useState(false);


  const handleChanche = (e) => {
    setDados({
      ...dados,
      [e.target.name]: e.target.value
    });
  };


  useEffect(() => {
    if (modo === "editar" && produto) {
      setDados({
        nome: produto.nome || "",

      });
    } else {
      setDados({
        nome: "",
        peso: "",
        categoriaId: "",
        image: "",
        preco: "",
      });
    };
  }, [produto, modo, open]);


  const salvarProduto = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url =
        modo === "editar"
          ? `https://todo-list-ajcm.onrender.com/api/produto/editar/${produto.id}`
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




  return (
    <div></div>
  )
}

export default ModalProduto