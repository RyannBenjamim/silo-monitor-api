const HttpError = require("../errors/HttpError");
const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  createSchema,
  updateSchema,
  loginSchema,
} = require("../schemas/userSchema");

const tokenSecretKey = process.env.TOKEN_SECRET_KEY;

const userController = {
  // GET /users
  index: async (req, res, next) => {
    try {
      const users = await userRepository.getAllUsers();
      res.json({ data: users });
    } catch (error) {
      next(error);
    }
  },

  // GET /users/:id
  show: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userRepository.getUser(id);
      if (!user) throw new HttpError(404, "Esse usuário não existe.");
      res.json({ data: user });
    } catch (error) {
      next(error);
    }
  },

  // POST /user
  create: async (req, res, next) => {
    try {
      const body = createSchema.safeParse(req.body);

      if (!body.success)
        throw new HttpError(
          400,
          "Erro de validação: Os campos obrigatórios são { username, password, role }."
        );

      const { username, password, role } = body.data;
      const usernameExists = await userRepository.getUserByUsername(username);

      if (usernameExists)
        throw new HttpError(409, "Esse username já foi cadastrado no sistema.");

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await userRepository.createUser({
        username,
        password: hashedPassword,
        role,
      });
      res.status(201).json({ data: newUser });
    } catch (error) {
      next(error);
    }
  },

  // POST /users/login
  login: async (req, res, next) => {
    try {
      const login = loginSchema.safeParse(req.body);

      if (!login.success)
        throw new HttpError(
          400,
          "Erro de validação: Os campos obrigatórios são { username, password }."
        );

      const { username, password } = login.data;
      const user = await userRepository.getUserByUsername(username);

      if (!user)
        throw new HttpError(
          404,
          "Usuário não encontrado."
        );

      const isSamePassword = await bcrypt.compare(password, user.password);
      if (!isSamePassword) throw new HttpError(401, "Senha inválida.");

      const payload = { username };
      const token = jwt.sign(payload, tokenSecretKey, {
        expiresIn: "30m",
      });

      res.status(200).json({
        message: "Login efetuado com sucesso",
        data: { token, id: user.id },
      });
    } catch (error) {
      next(error);
    }
  },

  // PUT /users/:id
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const userExists = await userRepository.getUser(id);
      if (!userExists) throw new HttpError(404, "Esse usuário não existe.");

      const bodyUpdated = updateSchema.safeParse(req.body);

      if (!bodyUpdated.success)
        throw new HttpError(
          400,
          "Erro de validação: Os campos obrigatórios são { username, password, role }."
        );

      const updatedUser = await userRepository.updateUser(id, bodyUpdated.data);
      res.status(200).json({
        message: "Dados do suário atualizado com sucesso.",
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  },

  // DELETE /users/:id
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const userExists = await userRepository.getUser(id);
      if (!userExists) throw new HttpError(404, "Esse usuário não existe.");

      const deletedUser = await userRepository.deleteUser(id);
      res
        .status(200)
        .json({ message: "Usuário deletado com sucesso.", data: deletedUser });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
