/*
  Warnings:

  - You are about to drop the `output_playlists` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `output_playlist_id` to the `weekly` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "output_playlists" DROP CONSTRAINT "output_playlists_weekly_user_id_fkey";

-- DropIndex
DROP INDEX "weekly_user_id";

-- AlterTable
ALTER TABLE "weekly" ADD COLUMN     "input_playlist_id" STRING[];
ALTER TABLE "weekly" ADD COLUMN     "output_playlist_id" STRING NOT NULL;

-- DropTable
DROP TABLE "output_playlists";
