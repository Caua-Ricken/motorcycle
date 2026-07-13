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
      }
    ]
  },
  {
    path: '/loja',
    element: <Loja />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
