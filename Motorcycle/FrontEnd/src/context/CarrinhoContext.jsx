import { createContext, useState, useEffect } from "react";


export const CarrinhoContext = createContext();

export const CarrinhoContextProvider = ({children}) => {
  const [carrinho, setCarrinho] = useState(() => {
  const carrinhoSalvo = localStorage.getItem("carrinho");

  return carrinhoSalvo
    ? JSON.parse(carrinhoSalvo)
    : [];
});

useEffect(() => {
  localStorage.setItem(
    "carrinho",
    JSON.stringify(carrinho)
  );
}, [carrinho]);

    //add
    const adicionarProduto = (produto, quantidade = 1) => {
        setCarrinho((itens) => {
            const produtoExiste = itens.find((item) => item.id === produto.id);

            if(produtoExiste) {
                return itens.map((item) => (
                    item.id === produto.id 
                    ? {
                        ...item,
                        quantidade: item.quantidade + quantidade
                    }
                    : item
                ))
            };

            return [
                ...itens,
                {
                    ...produto,
                    quantidade
                }
            ];
        })
    };

        //remove
        const removerCarrinho = (id) => {
            const confirmDelete = window.confirm(
            "Deseja realmente excluir este produto do carrinho?"
        );

        if (!confirmDelete) return;

            setCarrinho((itens) => itens.filter((item) => item.id !== id))
        }

        //limpar carrinho
        const limparCarrinho = () => {
            const confirmDelete = window.confirm(
            "Deseja realmente limpar o carrinho?"
        );

        if (!confirmDelete) return;

            setCarrinho([]);
        };
    



    return(
        <CarrinhoContext.Provider value={{carrinho, adicionarProduto, removerCarrinho, limparCarrinho}}>{children}</CarrinhoContext.Provider> 
    )
}