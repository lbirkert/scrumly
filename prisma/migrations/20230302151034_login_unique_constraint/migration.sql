/*
  Warnings:

  - A unique constraint covering the columns `[login]` on the table `Member` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Member_login_key" ON "Member"("login");
