const { PrismaClient } = require("@prisma/client");

console.log("Prisma Client carregado com sucesso!");

const prisma = new PrismaClient();

module.exports = prisma;
