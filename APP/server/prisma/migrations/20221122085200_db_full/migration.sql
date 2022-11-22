/*
  Warnings:

  - You are about to drop the column `code` on the `verify_account` table. All the data in the column will be lost.
  - Added the required column `verifyCode` to the `verify_account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "verify_account" DROP COLUMN "code",
ADD COLUMN     "verifyCode" VARCHAR(256) NOT NULL;
