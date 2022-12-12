-- CreateTable
CREATE TABLE "MovieSection" (
    "sectionID" TEXT NOT NULL PRIMARY KEY,
    "movieId" TEXT NOT NULL,
    "genderID" TEXT NOT NULL,
    "sinopse" TEXT NOT NULL,
    "end" DATETIME NOT NULL,
    CONSTRAINT "MovieSection_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MovieSection_genderID_fkey" FOREIGN KEY ("genderID") REFERENCES "Gender" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
