-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'ADMIN', 'GUIDE');

-- CreateEnum
CREATE TYPE "public"."ContentType" AS ENUM ('BLOG', 'VIDEO');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cellphone_number" TEXT,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserSpeciesUnlock" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "speciesId" TEXT NOT NULL,
    "basicInfo" BOOLEAN NOT NULL DEFAULT false,
    "conservation" BOOLEAN NOT NULL DEFAULT false,
    "distribution" BOOLEAN NOT NULL DEFAULT false,
    "behavior" BOOLEAN NOT NULL DEFAULT false,
    "unlockedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserSpeciesUnlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Reserve" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "area" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "activities" TEXT[],
    "protected_area_type" TEXT NOT NULL,
    "images" TEXT[],
    "entrance_fee" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Reserve_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Species" (
    "id" TEXT NOT NULL,
    "spanish_commonName" TEXT NOT NULL,
    "english_commonName" TEXT NOT NULL,
    "scientificName" TEXT NOT NULL,
    "conservationStatus" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "distribution" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Species_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SpeciesObservation" (
    "id" TEXT NOT NULL,
    "speciesId" TEXT NOT NULL,
    "reserveId" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "observedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "abundance" INTEGER DEFAULT 1,

    CONSTRAINT "SpeciesObservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Guide" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Guide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Event" (
    "id" TEXT NOT NULL,
    "reserveId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ReserveSpecies" (
    "id" TEXT NOT NULL,
    "reserveId" TEXT NOT NULL,
    "speciesId" TEXT NOT NULL,
    "abundance" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ReserveSpecies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ReserveGuide" (
    "id" TEXT NOT NULL,
    "reserveId" TEXT NOT NULL,
    "guideId" TEXT NOT NULL,

    CONSTRAINT "ReserveGuide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EducationalContent" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "public"."ContentType" NOT NULL,
    "contentUrl" TEXT,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EducationalContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "public"."User"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "UserSpeciesUnlock_userId_speciesId_key" ON "public"."UserSpeciesUnlock"("userId", "speciesId");

-- CreateIndex
CREATE UNIQUE INDEX "ReserveSpecies_reserveId_speciesId_key" ON "public"."ReserveSpecies"("reserveId", "speciesId");

-- CreateIndex
CREATE UNIQUE INDEX "ReserveGuide_reserveId_guideId_key" ON "public"."ReserveGuide"("reserveId", "guideId");

-- AddForeignKey
ALTER TABLE "public"."UserSpeciesUnlock" ADD CONSTRAINT "UserSpeciesUnlock_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserSpeciesUnlock" ADD CONSTRAINT "UserSpeciesUnlock_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "public"."Species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SpeciesObservation" ADD CONSTRAINT "SpeciesObservation_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "public"."Species"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SpeciesObservation" ADD CONSTRAINT "SpeciesObservation_reserveId_fkey" FOREIGN KEY ("reserveId") REFERENCES "public"."Reserve"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Event" ADD CONSTRAINT "Event_reserveId_fkey" FOREIGN KEY ("reserveId") REFERENCES "public"."Reserve"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ReserveSpecies" ADD CONSTRAINT "ReserveSpecies_reserveId_fkey" FOREIGN KEY ("reserveId") REFERENCES "public"."Reserve"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ReserveSpecies" ADD CONSTRAINT "ReserveSpecies_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "public"."Species"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ReserveGuide" ADD CONSTRAINT "ReserveGuide_reserveId_fkey" FOREIGN KEY ("reserveId") REFERENCES "public"."Reserve"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ReserveGuide" ADD CONSTRAINT "ReserveGuide_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "public"."Guide"("id") ON DELETE CASCADE ON UPDATE CASCADE;
