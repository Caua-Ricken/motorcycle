import { useState } from "react";
import "../../public/css/pagesCss/cadastroUsuario.css";

function CadastroUsuario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [role, setRole] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [mensagem, setMensagem] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [loading, setLoading] = useState(false);

  const cadastrarUsuario = async (e) => {
    e.preventDefault();

    setMensagem("");
    setSucesso(false);

    if (senha !== confirmarSenha) {
      setMensagem("As senhas não são iguais");
      return;
    }

    if (senha.length < 6) {
      setMensagem("A senha deve possuir pelo menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:3000/api/auth/cadastrar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome,
            email,
            senha,
            role,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMensagem(data.message || "Erro ao cadastrar usuário");
        return;
      }

      setMensagem(data.message || "Usuário cadastrado com sucesso");
      setSucesso(true);

      setNome("");
      setEmail("");
      setSenha("");
      setRole("");
      setConfirmarSenha("");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      setMensagem("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="register-page">
      <section className="register-card">
        <div className="register-icon">🚲</div>

        <div className="register-header">
          <span>BIKES PREIMUM</span>
          <h1>Crie sua conta</h1>
          <p>Cadastre-se para acessar nossa loja de bikes.</p>
        </div>

        <form className="register-form" onSubmit={cadastrarUsuario}>
          <div className="form-control">
            <label htmlFor="nome">Nome</label>

            <input
              type="text"
              id="nome"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

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
              placeholder="Mínimo de 6 caracteres"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              minLength={6}
              required
            />
          </div>

          <div className="form-control">
            <label htmlFor="confirmarSenha">Confirme sua senha</label>

            <input
              type="password"
              id="confirmarSenha"
              placeholder="Digite a senha novamente"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />
          </div>

          <div className="form-control">
            <label htmlFor="role">Tipo de usuário</label>

            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Selecione</option>
              <option value="admin">Administrador</option>
              <option value="user">Usuário</option>
            </select>
          </div>

          {mensagem && (
            <div
              className={
                sucesso
                  ? "register-message success"
                  : "register-message error"
              }
            >
              {mensagem}
            </div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Criar conta"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default CadastroUsuario;