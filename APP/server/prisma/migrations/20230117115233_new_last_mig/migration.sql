/*
  Warnings:

  - Added the required column `title` to the `patch_notes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE patch_notes_id_seq;
ALTER TABLE "patch_notes" ADD COLUMN     "title" VARCHAR(250) NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('patch_notes_id_seq');
ALTER SEQUENCE patch_notes_id_seq OWNED BY "patch_notes"."id";
