-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "Users" (
    "id" CHAR(36) NOT NULL,
    "username" VARCHAR(200) NOT NULL,
    "password" VARCHAR(250) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Silos" (
    "id" CHAR(36) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "user_id" CHAR(36) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Silos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registers" (
    "id" CHAR(36) NOT NULL,
    "temperature" DECIMAL(5,2) NOT NULL,
    "humidity" DECIMAL(5,2) NOT NULL,
    "silo_id" CHAR(36) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Registers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Silos" ADD CONSTRAINT "Silos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registers" ADD CONSTRAINT "Registers_silo_id_fkey" FOREIGN KEY ("silo_id") REFERENCES "Silos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
