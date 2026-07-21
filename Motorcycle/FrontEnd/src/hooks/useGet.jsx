import React from 'react'
import { useState, useEffect } from 'react'

const useGet = (url) => {
    const [dados, setDados] = useState([]);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");

    const buscarDados = async () => {
        setLoading(true);
        setErro("");

        try {
            const res = await fetch(url);
            const data = await res.json();

            if(!res.ok) {
                throw new Error(data.message || "Erro ao buscar usuário")
            };

            console.log(data)

            setDados(data);
            
        } catch (error) {
            setErro(data.message)
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        buscarDados()
    }, [url]);

  return {
    dados,
    loading,
    erro,
    buscarDados,
    setDados
  };
};

export default useGet