import { Link } from "react-router-dom";
import "../../public/css/pagesCss/errorPage.css";

const ErrorPage = () => {
  return (
    <div className="error-container">
      <h1>404</h1>

      <h2>Página não encontrada</h2>

      <p>
        A página que você está tentando acessar não existe ou foi removida.
      </p>

      <Link to="/" className="btn-voltar">
        Voltar para a login
      </Link>
    </div>
  );
};

export default ErrorPage;