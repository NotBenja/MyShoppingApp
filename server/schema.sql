-- Crear el esquema shopping_app
CREATE SCHEMA IF NOT EXISTS `shopping_app` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Usar el esquema shopping_app
USE `shopping_app`;

-- Crear la tabla products
CREATE TABLE IF NOT EXISTS `products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  `discountPercentage` DECIMAL(5, 2) NOT NULL,
  `rating` DECIMAL(3, 2) NOT NULL,
  `stock` INT NOT NULL,
  `brand` VARCHAR(255) NOT NULL,
  `category` VARCHAR(255) NOT NULL,
  `thumbnail` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Crear la tabla product_images
CREATE TABLE IF NOT EXISTS `product_images` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_product_images_products_idx` (`product_id` ASC),
  CONSTRAINT `fk_product_images_products`
    FOREIGN KEY (`product_id`)
    REFERENCES `shopping_app`.`products` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

COMMIT;