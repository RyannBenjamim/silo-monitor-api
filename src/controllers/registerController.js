const registerRepository = require("../repositories/registerRepository");
const siloRepository = require("../repositories/siloRepository");
const { createSchema } = require("../schemas/registerSchema");
const HttpError = require("../errors/HttpError");

const registerController = {
  // GET /registers/silos/:silo_id
  index: async (req, res, next) => {
    try {
      const { silo_id } = req.params;
      const { last } = req.query;
      const isLastRequested = last === "true";

      if (!isLastRequested) {
        const registers = await registerRepository.getAllRegisters(silo_id);
        return res.json({ data: registers });
      }

      const register = await registerRepository.getLastRegister(silo_id);
      res.json({ data: register });
    } catch (error) {
      next(error);
    }
  },

  // POST /registers
  create: async (req, res, next) => {
    try {
      const body = createSchema.safeParse(req.body);

      if (!body.success)
        throw new HttpError(
          400,
          "Erro de validação: Os campos obrigatórios são { silo_id, temperature, humidity }."
        );

      const { silo_id, temperature, humidity } = body.data;

      const siloExists = await siloRepository.getSilo(silo_id);
      if (!siloExists) throw new HttpError(404, "Esse silo não existe.");

      const newRegister = await registerRepository.createRegister(silo_id, {
        temperature,
        humidity,
      });

      res
        .status(201)
        .json({ message: "Registro criado com sucesso.", data: newRegister });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = registerController;
