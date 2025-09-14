const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(401)
      .json({ message: "No autorizado, no se encontró token" });
  }

  try {
    const [type, token] = authorization.split(" ");

    if (type !== "Bearer") {
      return res
        .status(401)
        .json({ message: "Formato de autorización inválido" });
    }

    // Verificar token con la SECRET
    const decoded = jwt.verify(token, process.env.SECRET);

    req.user = decoded.user; 
    next();
  } catch (error) {
    return res.status(401).json({ message: "No autorizado" });
  }
};
