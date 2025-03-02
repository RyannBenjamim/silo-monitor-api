const express = require("express");

const registerController = require("./controllers/registerController");
const siloController = require("./controllers/siloController");
const userController = require("./controllers/userController");

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
router.get("/registers/silos/:silo_id", registerController.index);

// Rotas relacionadas aos silos
router.get("/silos/:id", siloController.show);
router.put("/silos/:id", siloController.update);
router.delete("/silos/:id", siloController.delete);
router.post("/silos", siloController.create);
router.get("/silos", siloController.index);

// Rotas relacionadas aos usuários
router.get("/users", userController.index);
router.get("/users/:id", userController.show);
router.post("/users", userController.create);
router.post("/users/login", userController.login);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.delete);

module.exports = router;
