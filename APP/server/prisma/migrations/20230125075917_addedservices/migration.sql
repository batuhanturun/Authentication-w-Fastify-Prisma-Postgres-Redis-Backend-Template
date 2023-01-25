-- CreateTable
CREATE TABLE "services" (
    "id" INTEGER NOT NULL,
    "userID" INTEGER NOT NULL,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "bammaActive" BOOLEAN NOT NULL DEFAULT false,
    "awsActive" BOOLEAN NOT NULL DEFAULT false,
    "awsPlusActive" BOOLEAN NOT NULL DEFAULT false,
    "highCap" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "fki_users_id_to_services_userID" ON "services"("userID");

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "users_id_to_services_userID" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
