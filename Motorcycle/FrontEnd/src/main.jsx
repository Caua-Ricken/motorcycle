import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CarrinhoContextProvider } from './context/CarrinhoContext.jsx'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

import Login from "../src/pages/Login.jsx"
import Loja from "../src/pages/Loja.jsx"
import CadastrarUsuario from "../src/pages/CadastroUsuario.jsx"
import CadastroCategoria from "../src/pages/CadastroCategoria.jsx"
import CadastroProduto from "../src/pages/CadastroProduto.jsx"
import CadastroMovimentacao from "../src/pages/CadastroMovimentacao.jsx"
import Detalhes from "../src/pages/Detalhes.jsx" 
import Carrinho from "../src/pages/Carrinho.jsx"
import CadastroPagamento from "../src/pages/CadastroPagamento.jsx"
import ErrorPage from "../src/pages/ErrorPage.jsx"
import Dashboard from "../src/pages/Dashboard.jsx"

import ModalCarrinho from "../src/components/ModalCarrinho.jsx"
import ModalPagamento from "../src/components/ModalPagamento.jsx"
import ModalConclusao from './components/ModalConclusao.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: '/app',
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'cadastrarUsuario',
        element: <CadastrarUsuario />
      },
      {
        path: 'cadastroCategoria',
        element: <CadastroCategoria />
      },
      {
        path: 'cadastroProduto',
        element: <CadastroProduto />
      },
      {
        path: 'cadastroMovimentacao',
        element: <CadastroMovimentacao />
      },
      {
        path: 'cadastroPagamento',
        element: <CadastroPagamento />
      }
    ]
  },
  {
    path: '/loja',
    element: <Loja />
  },
  {
    path: '/loja/detalhes/:id',
    element: <Detalhes />
  },
  {
    path: '/loja/carrinho',
    element: <Carrinho />,
    children: [
      {
        index: true,
        element: <ModalCarrinho />
      },
      {
        path: 'pagamento',
        element: <ModalPagamento />
      },
      {
        path: 'conclusao',
        element: <ModalConclusao />

      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CarrinhoContextProvider>
      <RouterProvider router={router} />
    </CarrinhoContextProvider>
  </StrictMode>,
)
