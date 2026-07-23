const jwt = require("jsonwebtoken");

const JWT_SECRET = "dZiz1sr2HYGCE9Nn2WRTfTCbc1wFLAsZANuGkPG4mJg";

function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token não informado",
    });
  }

  const partes = authHeader.split(" ");

  if (partes.length !== 2 || partes[0] !== "Bearer") {
    return res.status(401).json({
      message: "Formato do token inválido",
    });
  }

  const token = partes[1];

  try {
    const usuarioDecodificado = jwt.verify(token, JWT_SECRET);

    req.usuario = usuarioDecodificado;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token inválido ou expirado",
    });
  }
}

module.exports = verificarToken;