/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `projects` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `projects` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `projects` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `projects` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "color" TEXT,
ADD COLUMN     "icon" TEXT,
ADD COLUMN     "key" TEXT,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "projects_key_key" ON "projects"("key");
