import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const navigate = useNavigate();

  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );

  const logout = () => {
    const confirmExit = window.confirm(
            "Deseja realmente sair?"
        );
        if (!confirmExit) return;

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
            to="hj"
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
            to="/app/logs"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Logs
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
            onClick={logout}
          >
            Sair
          </button>
        </div>
      </header>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}

export default App;