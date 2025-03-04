const prisma = require("../database/db");
const Silo = require("../models/Silo");

const siloRepository = {
  // Retorna todos os silos de um usuário
  getAllSilos: async (user_id) => {
    const silos = await prisma.silos.findMany({
      where: {
        user_id,
      },
    });

    return silos;
  },

  // Retorna um silo em específico
  getSilo: async (id) => {
    const silo = await prisma.silos.findUnique({
      where: {
        id,
      },
    });

    return silo;
  },

  // Cria um silo relacionado a usuário
  createSilo: async (user_id, status) => {
    const silo = new Silo(status);

    const newSilo = await prisma.silos.create({
      data: {
        id: silo.id,
        status: silo.status,
        user: {
          connect: {
            id: user_id,
          },
        },
      },
      select: {
        id: true,
      },
    });

    return newSilo;
  },

  // Atualiza o status de um silo
  updateStatus: async (id, newStatus) => {
    const updatedSilo = await prisma.silos.update({
      data: {
        status: newStatus?.toUpperCase(),
      },
      where: {
        id,
      },
    });

    return updatedSilo;
  },

  // Deleta um silo
  deleteSilo: async (id) => {
    const deletedSilo = await prisma.silos.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

    return deletedSilo;
  },
};

module.exports = siloRepository;
