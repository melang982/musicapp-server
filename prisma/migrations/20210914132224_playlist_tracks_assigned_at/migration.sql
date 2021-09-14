/*
  Warnings:

  - You are about to drop the `_PlaylistToTrack` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_PlaylistToTrack";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "PlaylistTracks" (
    "trackId" INTEGER NOT NULL,
    "playlistId" INTEGER NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("trackId", "playlistId"),
    FOREIGN KEY ("trackId") REFERENCES "Track" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("playlistId") REFERENCES "Playlist" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
