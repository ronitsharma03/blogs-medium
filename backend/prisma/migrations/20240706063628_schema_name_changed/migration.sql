/*
  Warnings:

  - You are about to drop the column `imgage_url` on the `Blog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "imgage_url",
ADD COLUMN     "imgageUrl" TEXT;
