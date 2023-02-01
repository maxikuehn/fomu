-- CreateTable
CREATE TABLE "users" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "email" STRING NOT NULL,
    "refresh_token" STRING NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weekly" (
    "user_id" STRING NOT NULL
);

-- CreateTable
CREATE TABLE "output_playlists" (
    "id" STRING NOT NULL,
    "playlist_id" STRING NOT NULL,
    "input_playlists" STRING[],
    "weekly_user_id" STRING NOT NULL,

    CONSTRAINT "output_playlists_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "weekly_user_id_key" ON "weekly"("user_id");

-- CreateIndex
CREATE INDEX "weekly_user_id" ON "weekly"("user_id");

-- AddForeignKey
ALTER TABLE "weekly" ADD CONSTRAINT "weekly_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "output_playlists" ADD CONSTRAINT "output_playlists_weekly_user_id_fkey" FOREIGN KEY ("weekly_user_id") REFERENCES "weekly"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
