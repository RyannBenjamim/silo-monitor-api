require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();

app.use(express.json());
app.use(routes);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

const start = () => {
  const server = app.listen(PORT, () =>
    console.log(`Servidor rodando na porta: ${PORT}`)
  );

  server.on("error", () => {
    console.error(`Erro ao iniciar o servidor: ${error.message}`);
  });
};

start();
