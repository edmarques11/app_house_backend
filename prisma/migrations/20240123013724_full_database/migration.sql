-- CreateTable
CREATE TABLE `tb_user` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `profile_image_id` VARCHAR(50) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tb_user_email_key`(`email`),
    UNIQUE INDEX `tb_user_profile_image_id_key`(`profile_image_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_address` (
    `id` VARCHAR(191) NOT NULL,
    `zip_code` CHAR(8) NOT NULL,
    `public_place` VARCHAR(100) NOT NULL,
    `complement` VARCHAR(100) NULL,
    `district` VARCHAR(200) NOT NULL,
    `city` VARCHAR(200) NOT NULL,
    `number` VARCHAR(10) NOT NULL,
    `uf` CHAR(2) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_immobile` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(50) NOT NULL,
    `address_id` VARCHAR(50) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tb_immobile_address_id_key`(`address_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_image` (
    `id` VARCHAR(191) NOT NULL,
    `hash` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_advertisement` (
    `id` VARCHAR(191) NOT NULL,
    `active` INTEGER NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `description` VARCHAR(5000) NOT NULL,
    `width` DOUBLE NOT NULL,
    `length` DOUBLE NOT NULL,
    `references` VARCHAR(255) NOT NULL,
    `phone_contact` VARCHAR(100) NOT NULL,
    `price` DOUBLE NOT NULL,
    `immobile_id` VARCHAR(50) NOT NULL,
    `owner_id` VARCHAR(50) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AdvertisementToImage` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_AdvertisementToImage_AB_unique`(`A`, `B`),
    INDEX `_AdvertisementToImage_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_user` ADD CONSTRAINT `tb_user_profile_image_id_fkey` FOREIGN KEY (`profile_image_id`) REFERENCES `tb_image`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_immobile` ADD CONSTRAINT `tb_immobile_address_id_fkey` FOREIGN KEY (`address_id`) REFERENCES `tb_address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_advertisement` ADD CONSTRAINT `tb_advertisement_immobile_id_fkey` FOREIGN KEY (`immobile_id`) REFERENCES `tb_immobile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_advertisement` ADD CONSTRAINT `tb_advertisement_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `tb_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AdvertisementToImage` ADD CONSTRAINT `_AdvertisementToImage_A_fkey` FOREIGN KEY (`A`) REFERENCES `tb_advertisement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AdvertisementToImage` ADD CONSTRAINT `_AdvertisementToImage_B_fkey` FOREIGN KEY (`B`) REFERENCES `tb_image`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
