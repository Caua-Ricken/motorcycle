import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

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


const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/app',
    element: <App />,
    children: [
      {
        index: true,
        element: <Loja />
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
    ]
  },
  {
    path: '/loja',
    element: <Loja />
  },
  {
    path: '/detalhes/:id',
    element: <Detalhes />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
