/*
  Warnings:

  - Made the column `dubbedVersion` on table `Movie` required. This step will fail if there are existing NULL values in that column.
  - Made the column `originalLanguage` on table `Movie` required. This step will fail if there are existing NULL values in that column.
  - Made the column `parentalRatingType` on table `Movie` required. This step will fail if there are existing NULL values in that column.
  - Made the column `subtitledVersion` on table `Movie` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "releaseDate" DATETIME NOT NULL,
    "lengthInMinutes" INTEGER NOT NULL,
    "coverUrl" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "parentalRatingType" TEXT NOT NULL,
    "dubbedVersion" BOOLEAN NOT NULL,
    "subtitledVersion" BOOLEAN NOT NULL,
    "originalLanguage" TEXT NOT NULL
);
INSERT INTO "new_Movie" ("coverUrl", "dubbedVersion", "id", "lengthInMinutes", "originalLanguage", "parentalRatingType", "releaseDate", "subtitledVersion", "synopsis", "title") SELECT "coverUrl", "dubbedVersion", "id", "lengthInMinutes", "originalLanguage", "parentalRatingType", "releaseDate", "subtitledVersion", "synopsis", "title" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
