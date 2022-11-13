/*
  Warnings:

  - You are about to drop the column `Gender` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `lenght` on the `Movie` table. All the data in the column will be lost.
  - Added the required column `coverUrl` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lengthInMinutes` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "MovieGenderR" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "genderId" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,
    CONSTRAINT "MovieGenderR_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES "Gender" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MovieGenderR_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "releaseDate" DATETIME NOT NULL,
    "lengthInMinutes" INTEGER NOT NULL,
    "coverUrl" TEXT NOT NULL
);
INSERT INTO "new_Movie" ("id", "releaseDate", "title") SELECT "id", "releaseDate", "title" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
