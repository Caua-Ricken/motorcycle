import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import MessageExit from "./components/MessageExit";
import { useEffect, useState } from "react";

function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const validarAdm = async () => {
      const token = localStorage.getItem("token");

      if(!token) {
        navigate("/")
        return;
      };

      setLoading(true);

      try {
        const res = await fetch("http://localhost:3000/api/auth/validar-adm", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const data = await res.json();

        if(!res.ok) {
          alert(data.message);
          localStorage.removeItem("token");
          localStorage.removeItem("usuario");
          navigate("/")
          return;
        };

        console.log(data.message);
        
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
      }
    };

    validarAdm();
  }, [navigate]);


  //parte normal

  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    navigate("/");
  };

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <div className="header-logo">
          <span className="logo-icon">🚲</span>

          <div>
            <h1>MotorCycle</h1>
            <p>Painel administrativo</p>
          </div>
        </div>

        <nav className="admin-navigation">

            <NavLink
            to='.'
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="cadastroProduto"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Produto
          </NavLink>

          <NavLink
            to="cadastroCategoria"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Categoria
          </NavLink>

          <NavLink
            to="cadastroMovimentacao"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Movimentação
          </NavLink>

          <NavLink
            to="cadastrarUsuario"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Usuário
          </NavLink>

           <NavLink
            to="cadastroPagamento"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Forma Pagamento
          </NavLink>
        </nav>

        <div className="header-user">
          <div className="user-info">
            <span>{usuario?.nome || "Administrador"}</span>
            <small>{usuario?.role || "admin"}</small>
          </div>

          <button
            type="button"
            className="logout-button"
            onClick={() => setOpen(true)}
          >
            Sair
          </button>
        </div>
      </header>

      <main className="admin-main">
        <Outlet />
      </main>

      <MessageExit open={open} onConfirm={logout} onCancel={() => setOpen(false)} />
    </div>
  );
}

export default App;