const express = require("express");

const registerController = require("./controllers/registerController");
const siloController = require("./controllers/siloController");
const userController = require("./controllers/userController");
const authMiddleware = require("./middlewares/authMiddleware");
const adminMiddleware = require("./middlewares/adminMiddleware");

const router = express.Router();

// Rota de teste de funcionamento
router.get("/api/ok", (req, res) =>
  res.status(200).json({
    message:
      "Se você está lendo essa mensagem, é porque a api está funcionando.",
    author: "Ryan :)",
  })
);

// Rotas relacionadas aos registros
router.post("/registers", registerController.create);
router.get("/registers/silos/:silo_id", authMiddleware, registerController.index);

// Rotas relacionadas aos silos
router.get("/silos/:id", authMiddleware, siloController.show);
router.put("/silos/:id", authMiddleware, adminMiddleware, siloController.update);
router.delete("/silos/:id", authMiddleware, adminMiddleware, siloController.delete);
router.post("/silos", authMiddleware, adminMiddleware, siloController.create);
router.get("/silos", authMiddleware, siloController.index);

// Rotas relacionadas aos usuários
router.get("/users", authMiddleware, adminMiddleware, userController.index);
router.get("/users/:id", authMiddleware, userController.show);
router.post("/users", authMiddleware, adminMiddleware, userController.create);
router.post("/users/login", userController.login);
router.put("/users/:id", authMiddleware, adminMiddleware, userController.update);
router.delete("/users/:id", authMiddleware, adminMiddleware, userController.delete);

module.exports = router;
