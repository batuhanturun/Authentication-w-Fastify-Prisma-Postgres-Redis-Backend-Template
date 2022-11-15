-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "password" VARCHAR(256) NOT NULL,
    "creationAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reset_password" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "resetCode" VARCHAR(256) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "expiredTime" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reset_password_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "fki_userID_to_reset_password" ON "reset_password"("userID");

-- AddForeignKey
ALTER TABLE "reset_password" ADD CONSTRAINT "users_id_to_reset_password_userID" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
