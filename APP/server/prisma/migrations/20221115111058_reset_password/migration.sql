-- CreateTable
CREATE TABLE "reset_password" (
    "id" SERIAL NOT NULL,
    "expiredTime" TIMETZ(6) NOT NULL,
    "userID" INTEGER NOT NULL,
    "resetCode" VARCHAR(256) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "reset_password_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "fki_userID_to_reset_password" ON "reset_password"("userID");

-- AddForeignKey
ALTER TABLE "reset_password" ADD CONSTRAINT "users_id_to_reset_password_userID" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
