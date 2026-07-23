import { useState } from "react";

const usePost = () => {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const enviarDados = async (url, dados, metodo = 'POST') => {
    setLoading(true);
    setErro("");

    try {
      const response = await fetch(url, {
        method: metodo,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      const data = await response.json();

       if (!response.ok) {
        setErro(data.message);
        alert(data.message);

        return null;
      };

      alert(data.message);
      return data;

    } catch (error) {
      setErro(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    enviarDados,
    loading,
    erro,
  };
};

export default usePost;