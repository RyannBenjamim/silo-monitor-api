const prisma = require("../database/db");
const jwt = require("jsonwebtoken");

const tokenSecretKey = process.env.TOKEN_SECRET_KEY;

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Token de autorização é obrigatório." });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Formato de token inválido." });
  }

  try {
    const { username } = jwt.verify(token, tokenSecretKey);

    const user = await prisma.users.findUnique({
      where: {
        username: username,
      },
      select: {
        role: true,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Token de usuário inválido." });
    }

    req.authenticatedUser = user;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expirado." });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Token inválido." });
    } else {
      return res
        .status(500)
        .json({ message: "Erro na autenticação.", error: error.message });
    }
  }
};

module.exports = authMiddleware;
