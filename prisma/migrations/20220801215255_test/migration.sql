-- AlterTable
ALTER TABLE "User" ADD COLUMN     "roll" TEXT NOT NULL DEFAULT 'guest',
ADD COLUMN     "secret" TEXT NOT NULL DEFAULT 'default secret';
