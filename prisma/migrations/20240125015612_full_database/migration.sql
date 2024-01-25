-- CreateTable
CREATE TABLE "tb_user" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "profile_image_id" VARCHAR(50),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_address" (
    "id" TEXT NOT NULL,
    "zip_code" CHAR(8) NOT NULL,
    "public_place" VARCHAR(100) NOT NULL,
    "complement" VARCHAR(100),
    "district" VARCHAR(200) NOT NULL,
    "city" VARCHAR(200) NOT NULL,
    "number" VARCHAR(10) NOT NULL,
    "uf" CHAR(2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_immobile" (
    "id" TEXT NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "address_id" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_immobile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_image" (
    "id" TEXT NOT NULL,
    "hash" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_advertisement" (
    "id" TEXT NOT NULL,
    "active" INTEGER NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" VARCHAR(5000) NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "length" DOUBLE PRECISION NOT NULL,
    "references" VARCHAR(255) NOT NULL,
    "phone_contact" VARCHAR(100) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "immobile_id" VARCHAR(50) NOT NULL,
    "owner_id" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_advertisement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AdvertisementToImage" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_user_email_key" ON "tb_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tb_user_profile_image_id_key" ON "tb_user"("profile_image_id");

-- CreateIndex
CREATE UNIQUE INDEX "tb_immobile_address_id_key" ON "tb_immobile"("address_id");

-- CreateIndex
CREATE UNIQUE INDEX "_AdvertisementToImage_AB_unique" ON "_AdvertisementToImage"("A", "B");

-- CreateIndex
CREATE INDEX "_AdvertisementToImage_B_index" ON "_AdvertisementToImage"("B");

-- AddForeignKey
ALTER TABLE "tb_user" ADD CONSTRAINT "tb_user_profile_image_id_fkey" FOREIGN KEY ("profile_image_id") REFERENCES "tb_image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_immobile" ADD CONSTRAINT "tb_immobile_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "tb_address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_advertisement" ADD CONSTRAINT "tb_advertisement_immobile_id_fkey" FOREIGN KEY ("immobile_id") REFERENCES "tb_immobile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_advertisement" ADD CONSTRAINT "tb_advertisement_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "tb_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdvertisementToImage" ADD CONSTRAINT "_AdvertisementToImage_A_fkey" FOREIGN KEY ("A") REFERENCES "tb_advertisement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdvertisementToImage" ADD CONSTRAINT "_AdvertisementToImage_B_fkey" FOREIGN KEY ("B") REFERENCES "tb_image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
