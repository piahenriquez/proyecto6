const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(401)
      .json({ message: "No autorizado, No se encontro token" });
  }

  try {
    const [type, token] = authorization.split(" ");

    if (type !== "Bearer" && type !== "token") {
      return res
        .status(401)
        .json({ error: "Formato de autorización inválido." });
    }
    // Verificar token con la SECRET
    const decoded = jwt.verify(token, process.env.SECRET);

    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "No autorizado, Token inválido" });
  }
};
