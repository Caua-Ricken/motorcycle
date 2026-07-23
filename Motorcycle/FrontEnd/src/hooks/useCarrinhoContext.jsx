import { useContext } from "react";
import { CarrinhoContext } from "../context/CarrinhoContext";

export const useCarrinhoContext = () => {

    const context = useContext(CarrinhoContext);

    if(!context) {
        console.log("contexto não encontrado.")
        alert("Contexto não encontrado")
    };

    return context;
}