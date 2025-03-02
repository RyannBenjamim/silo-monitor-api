const { z } = require("zod");

const createSchema = z
  .object({
    username: z.string(),
    password: z.string(),
    role: z.enum(["admin", "standard"]).default("standard"),
  })
  .strict();

const updateSchema = z
  .object({
    username: z.string().optional(),
    password: z.string().optional(),
    role: z.enum(["admin", "standard"]).optional(),
  })
  .strict();

const loginSchema = z
  .object({
    username: z.string(),
    password: z.string(),
  })
  .strict();

module.exports = { createSchema, updateSchema, loginSchema };
