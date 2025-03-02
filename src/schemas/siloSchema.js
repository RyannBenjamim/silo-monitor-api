const { z } = require("zod");

const createSchema = z
  .object({
    user_id: z.string().uuid(),
    status: z.enum(["active", "inactive"]).default("active"),
  })
  .strict();

const updateSchema = z
  .object({
    status: z.enum(["active", "inactive"]).optional(),
  })
  .strict();

module.exports = { createSchema, updateSchema };
