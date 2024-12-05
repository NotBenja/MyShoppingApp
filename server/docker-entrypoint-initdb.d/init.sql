-- Crear tablas
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema tienda
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tienda` DEFAULT CHARACTER SET utf8 ;
USE `tienda`;

-- -----------------------------------------------------
-- Table `tienda`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tienda`.`productos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` TEXT NULL,
  `precio` DECIMAL(10,2) NOT NULL,
  `fecha_creacion` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `tienda`.`inventario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tienda`.`inventario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `producto_id` INT NOT NULL,
  `cantidad` INT NOT NULL,
  `ultima_actualizacion` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_inventario_productos_idx` (`producto_id` ASC),
  CONSTRAINT `fk_inventario_productos`
    FOREIGN KEY (`producto_id`)
    REFERENCES `tienda`.`productos` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `tienda`.`ventas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tienda`.`ventas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `producto_id` INT NOT NULL,
  `cantidad` INT NOT NULL,
  `total` DECIMAL(10,2) NOT NULL,
  `fecha_venta` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_ventas_productos_idx` (`producto_id` ASC),
  CONSTRAINT `fk_ventas_productos`
    FOREIGN KEY (`producto_id`)
    REFERENCES `tienda`.`productos` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE USER IF NOT EXISTS 'admin'@'%' IDENTIFIED BY 'myshoppingapp';
GRANT ALL PRIVILEGES ON tienda.* TO 'admin'@'%';
FLUSH PRIVILEGES;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

COMMIT;

-- Poblar la tabla productos
INSERT INTO productos (id, nombre, descripcion, precio, fecha_creacion) VALUES
(1, 'Producto A', 'Descripción del Producto A', 10.99, '2023-01-01 10:00:00'),
(2, 'Producto B', 'Descripción del Producto B', 20.99, '2023-01-02 11:00:00'),
(3, 'Producto C', 'Descripción del Producto C', 30.99, '2023-01-03 12:00:00');

-- Poblar la tabla inventario
INSERT INTO inventario (id, producto_id, cantidad, ultima_actualizacion) VALUES
(1, 1, 100, '2023-01-10 10:00:00'),
(2, 2, 200, '2023-01-11 11:00:00'),
(3, 3, 300, '2023-01-12 12:00:00');

-- Poblar la tabla ventas
INSERT INTO ventas (id, producto_id, cantidad, total, fecha_venta) VALUES
(1, 1, 2, 21.98, '2023-02-01 10:00:00'),
(2, 2, 1, 20.99, '2023-02-02 11:00:00'),
(3, 3, 3, 92.97, '2023-02-03 12:00:00');