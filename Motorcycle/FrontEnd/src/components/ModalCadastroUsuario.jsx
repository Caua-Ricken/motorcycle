import React from 'react'
import { useState } from "react";
import usePost from "../hooks/usePost";
import "../../public/css/modalCss/modalCadastroUsuario.css";

const ModalCadastroUsuario = ({ open, onClose }) => {

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [role, setRole] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [mensagem, setMensagem] = useState("");
  const [sucesso, setSucesso] = useState(false);

  const { enviarDados, loading, erro } = usePost();

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

    const dadosPost = {
      nome,
      email,
      senha,
      role
    };

    const res = await enviarDados(
      "http://localhost:3000/api/auth/cadastrar",
      dadosPost,
      "POST"
    );

    if (!res) {
    setMensagem(erro || "Erro ao cadastrar usuário");
    return;
    }

    setMensagem(res.message);
    setSucesso(true);

    setNome("");
    setEmail("");
    setSenha("");
    setRole("");
    setConfirmarSenha("");

    setTimeout(() => {
      setMensagem("");
      onClose();
    }, 2000);
  };

  
  if (!open) return null;

  return (
     <div className="modal-cadastro-overlay">
    <div className="modal-cadastro">

      <button
        type="button"
        className="modal-cadastro-close"
        onClick={onClose}
      >
        ×
      </button>

      <h2>Criar conta</h2>

      <p>Preencha os dados abaixo para criar sua conta.</p>

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
    </div>
  </div>
  );
}

export default ModalCadastroUsuario