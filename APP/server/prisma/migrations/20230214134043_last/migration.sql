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

-- CreateTable
CREATE TABLE "verify_account" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "expiredTime" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "verifyCode" VARCHAR(256) NOT NULL,

    CONSTRAINT "verify_account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_messages" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "location" VARCHAR(100) NOT NULL,
    "message" VARCHAR(3000) NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "issue" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(15) NOT NULL,

    CONSTRAINT "contact_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patch_notes" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "notes" VARCHAR(5000) NOT NULL,
    "creationAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" VARCHAR(250) NOT NULL,

    CONSTRAINT "patch_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "bammaActive" BOOLEAN NOT NULL DEFAULT false,
    "awsActive" BOOLEAN NOT NULL DEFAULT false,
    "awsPlusActive" BOOLEAN NOT NULL DEFAULT false,
    "highCap" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "cardNumber" VARCHAR(256) NOT NULL,
    "cardCVC" VARCHAR(256) NOT NULL,
    "cardEX" VARCHAR(256) NOT NULL,
    "creationAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cardLastDigits" INTEGER NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "fki_userID_to_reset_password" ON "reset_password"("userID");

-- CreateIndex
CREATE INDEX "fki_users_id_to_verify_account_userID" ON "verify_account"("userID");

-- CreateIndex
CREATE INDEX "fki_b" ON "verify_account"("userID");

-- CreateIndex
CREATE INDEX "fki_users_id_to_contact_messages_userID" ON "contact_messages"("userID");

-- CreateIndex
CREATE INDEX "fki_users_id_to_patch_notes_userID" ON "patch_notes"("userID");

-- CreateIndex
CREATE INDEX "fki_users_id_to_services_userID" ON "services"("userID");

-- CreateIndex
CREATE INDEX "fki_users_id_to_payments_userID" ON "payments"("userID");

-- AddForeignKey
ALTER TABLE "reset_password" ADD CONSTRAINT "users_id_to_reset_password_userID" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "verify_account" ADD CONSTRAINT "users_id_to_verify_account_userID" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contact_messages" ADD CONSTRAINT "users_id_to_contact_messages_userID" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "patch_notes" ADD CONSTRAINT "users_id_to_patch_notes_userID" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "users_id_to_services_userID" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "users_id_to_payments_userID" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
