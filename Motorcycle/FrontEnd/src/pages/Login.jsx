import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../public/css/pagesCss/login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  const fazerLogin = async (e) => {
    e.preventDefault();

    setMensagem("");
    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:3000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            senha,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMensagem(data.message || "Erro ao realizar login");
        return;
      }

      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "usuario",
        JSON.stringify(data.usuario)
      );

      if (data.usuario.role === "admin") {
        navigate("/app");
        return;
      }

      if (data.usuario.role === "user") {
        navigate("/loja");
        return;
      }

      localStorage.removeItem("token");
      localStorage.removeItem("usuario");

      setMensagem("Perfil de usuário inválido");
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);

      setMensagem("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-container">
        <div className="login-info">
          <span className="login-label">BIKES PREMIUM</span>

          <h1>Encontre a sua bike ideal</h1>

          <p>
            Entre no sistema para visualizar bikes, acompanhar produtos
            e gerenciar as informações da loja.
          </p>

          <div className="login-benefits">
            <div>
              <span>✓</span>
              <p>Catálogo de bicicletas</p>
            </div>

            <div>
              <span>✓</span>
              <p>Gerenciamento de produtos</p>
            </div>

            <div>
              <span>✓</span>
              <p>Acesso protegido com JWT</p>
            </div>
          </div>
        </div>

        <div className="login-card">
          <div className="login-icon">🚲</div>

          <div className="login-header">
            <h2>Faça seu login</h2>

            <p>Informe seus dados para acessar o sistema</p>
          </div>

          <form onSubmit={fazerLogin} className="login-form">
            <div className="form-control">
              <label htmlFor="email">E-mail</label>

              <input
                type="email"
                id="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label htmlFor="senha">Senha</label>

              <input
                type="password"
                id="senha"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>

            {mensagem && (
              <div className="login-message">
                {mensagem}
              </div>
            )}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Login;