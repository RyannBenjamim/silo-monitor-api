const HttpError = require("../errors/HttpError");
const siloRepository = require("../repositories/siloRepository");
const userRepository = require("../repositories/userRepository");
const { createSchema, updateSchema } = require("../schemas/siloSchema");

const siloController = {
  // GET /silos
  index: async (req, res, next) => {
    try {
      const { user_id } = req.query;

      const userExists = await userRepository.getUser(user_id);
      if (!userExists) throw new HttpError(404, "Esse usuário não existe.");

      const silos = await siloRepository.getAllSilos(user_id);
      res.json({ data: silos });
    } catch (error) {
      next(error);
    }
  },

  // GET /silos/:id
  show: async (req, res, next) => {
    try {
      const { id } = req.params;
      const silo = await siloRepository.getSilo(id);

      if (!silo) throw new HttpError(404, "Esse silo não existe.");
      res.json({ data: silo });
    } catch (error) {
      next(error);
    }
  },

  // POST /silos
  create: async (req, res, next) => {
    try {
      const body = createSchema.safeParse(req.body);

      if (!body.success)
        throw new HttpError(
          400,
          "Erro de validação: O campo obrigatório é { user_id, status }."
        );

      const { user_id, status } = body.data;

      const userExists = await userRepository.getUser(user_id);
      if (!userExists) throw new HttpError(404, "Esse usuário não existe.");

      const newSilo = await siloRepository.createSilo(user_id, status);
      return res
        .status(201)
        .json({ message: "Silo criado com sucesso.", data: newSilo });
    } catch (error) {
      next(error);
    }
  },

  // PUT /silos/:id
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const body = updateSchema.safeParse(req.body);

      if (!body.success)
        throw new HttpError(
          400,
          "Erro de validação: O campo obrigatório é { status }."
        );

      const siloExists = await siloRepository.getSilo(id);
      if (!siloExists) throw new HttpError(404, "Esse silo não existe.");

      const updatedSilo = await siloRepository.updateStatus(id, status);
      res
        .status(200)
        .json({ message: "Status atualizado com sucesso.", data: updatedSilo });
    } catch (error) {
      next(error);
    }
  },

  // DELETE /silos/:id
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      const siloExists = await siloRepository.getSilo(id);
      if (!siloExists) throw new HttpError(404, "Esse silo não existe.");

      const deletedSilo = await siloRepository.deleteSilo(id);
      res
        .status(200)
        .json({ message: "Silo deletado com sucesso.", data: deletedSilo });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = siloController;
