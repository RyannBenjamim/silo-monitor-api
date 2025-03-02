const { z } = require("zod");

const createSchema = z
  .object({
    silo_id: z.string().uuid(),
    temperature: z.number(),
    humidity: z.number(),
  })
  .strict();

module.exports = { createSchema };
