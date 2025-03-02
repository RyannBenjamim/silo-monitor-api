const prisma = require("../database/db");
const Register = require("../models/Register");

const registerRepository = {
  // retorna todos os registros de um silo
  getAllRegisters: async (silo_id) => {
    const registers = await prisma.registers.findMany({
      where: {
        silo_id,
      },
    });

    return registers;
  },

  // retorna o último registro de um silo
  getLastRegister: async (silo_id) => {
    const register = await prisma.registers.findFirst({
      where: {
        silo_id,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return register;
  },

  // cria um registro relacionado a um silo
  createRegister: async (silo_id, body) => {
    const register = new Register(body);

    const newRegister = await prisma.registers.create({
      data: {
        id: register.id,
        temperature: register.temperature,
        humidity: register.humidity,
        silo: {
          connect: {
            id: silo_id,
          },
        },
      },
      select: {
        id: true,
      },
    });

    return newRegister;
  },
};

module.exports = registerRepository;
