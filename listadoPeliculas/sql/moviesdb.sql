DROP DATABASE IF EXISTS moviesdb;
CREATE DATABASE moviesdb;
USE moviesdb;

-- Crear tabla movie
CREATE TABLE `movie` (
  `id` BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  `title` VARCHAR(255) NOT NULL,
  `year` INT NOT NULL,
  `poster` TEXT,
  `director` VARCHAR(255) NOT NULL,
  `actors` VARCHAR(255) NOT NULL,
  `plot` TEXT NOT NULL,
  `rating` DECIMAL(2,1) UNSIGNED NOT NULL,
  `runtime` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Crear tabla genre
CREATE TABLE `genre` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Crear tabla movie_genres
CREATE TABLE `movie_genres` (
  `movie_id` BINARY(16) NOT NULL,
  `genre_id` INT NOT NULL,
  PRIMARY KEY (`movie_id`, `genre_id`),
  KEY `genre_id` (`genre_id`),
  CONSTRAINT `movie_genres_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`),
  CONSTRAINT `movie_genres_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Insertar datos en la tabla movie
INSERT INTO `movie` (`id`, `title`, `year`, `poster`, `director`, `actors`, `plot`, `rating`, `runtime`) VALUES
(UUID_TO_BIN(UUID()), 'Heretic', 2024, 'https://m.media-amazon.com/images/M/MV5BMzFiMWM4YjAtY2Y3Yi00MDIzLTk0N2MtYTAwNGM3ZmMwODhlXkEyXkFqcGc@._V1_SX300.jpg', 'Scott Derrickson, Bryan Woods', 'Hugh Grant, Sophie Thatcher, Chloe East', 'wo young religious women are drawn into a game of cat-and-mouse in the house of a strange man.', 7.0, '111 min');

INSERT INTO `genre` (`name`) VALUES
('Action'),('Sci-fi'),('Thriller'), ('Drama'), ('Mystery'), ('Crime'), ('Horror');

-- Insertar datos en la tabla movie_genres
INSERT INTO `movie_genres` (`movie_id`, `genre_id`) VALUES
((SELECT id FROM movie WHERE title = 'Heretic'), (SELECT id FROM genre WHERE name = 'Horror'));
