-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADMIN', 'STANDARD');

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "role" "Roles" NOT NULL DEFAULT 'STANDARD';
