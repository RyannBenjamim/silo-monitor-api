const prisma = require("../database/db");
const User = require("../models/User");

const userRepository = {
  // Retorna todos os usuários do bando de dados
  getAllUsers: async () => {
    const users = await prisma.users.findMany();
    return users;
  },

  // Retorna um usuário em específico
  getUser: async (id) => {
    const user = await prisma.users.findUnique({
      where: {
        id,
      },
    });

    return user;
  },

  // Retorna um usuário em específico pelo seu username
  getUserByUsername: async (username) => {
    const user = await prisma.users.findUnique({
      where: {
        username,
      },
    });

    return user;
  },

  // Cria um usuário
  createUser: async (body) => {
    const user = new User(body);

    const newUser = await prisma.users.create({
      data: user,
      select: {
        id: true,
        username: true,
        role: true,
      },
    });

    return newUser;
  },

  // Atualiza um usuário
  updateUser: async (id, bodyUpdated) => {
    const updatedUser = await prisma.users.update({
      data: bodyUpdated,
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        role: true,
      },
    });

    return updatedUser;
  },

  // Deleta um usuário
  deleteUser: async (id) => {
    const deletedUser = await prisma.users.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

    return deletedUser;
  },
};

module.exports = userRepository;
