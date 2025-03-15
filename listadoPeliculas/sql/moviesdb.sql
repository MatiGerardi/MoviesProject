DROP DATABASE IF EXISTS moviesdb;
CREATE DATABASE moviesdb;
USE moviesdb;

-- Crear tabla movie
CREATE TABLE `movie` (
  `id` BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  `title` VARCHAR(255) NOT NULL,
  `year` INT NOT NULL,
  `director` VARCHAR(255) NOT NULL,
  `duration` INT NOT NULL,
  `poster` TEXT,
  `rate` DECIMAL(2,1) UNSIGNED NOT NULL,
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
INSERT INTO `movie` (`id`, `title`, `year`, `director`, `duration`, `poster`, `rate`) VALUES
(UUID_TO_BIN(UUID()), 'Heretic', 2024, 'Scott Derrickson', 110, './src/assets/heretic.webp', 9.0),
(UUID_TO_BIN(UUID()), 'Coherence', 2013, 'James Ward Byrkit', 89, './src/assets/coherence.webp', 9.0),
(UUID_TO_BIN(UUID()), 'Oppenheimer', 2023, 'Christopher Nolan', 180, './src/assets/oppenheimer.webp', 9.0),
(UUID_TO_BIN(UUID()), 'The Game', 1997, 'David Fincher', 129, './src/assets/the_game.webp', 8.0),
(UUID_TO_BIN(UUID()), 'Misantropo', 2023, 'Damián Szifron', 104, './src/assets/misantropo.webp', 6.0),
(UUID_TO_BIN(UUID()), 'Blade Runner', 1982, 'Ridley Scott', 117, './src/assets/blade_runner.webp', 5.0),
(UUID_TO_BIN(UUID()), 'Blade Runner 2049', 2017, 'Denis Villeneuve', 164, './src/assets/blade_runner_2049.webp', 5.0),
(UUID_TO_BIN(UUID()), 'Knock at the Cabin', 2023, 'M. Night Shyamalan', 100, './src/assets/knock_at_the_cabin.webp', 6.0),
(UUID_TO_BIN(UUID()), 'Dallas Buyers Club', 2013, 'Jean-Marc Vallée', 117, './src/assets/dallas_buyers_club.webp', 5.0),
(UUID_TO_BIN(UUID()), 'The Creator', 2023, 'Gareth Edwards', 133, './src/assets/the_creator.webp', 5.0),
(UUID_TO_BIN(UUID()), 'The Wolf of Wall Street', 2013, 'Martin Scorsese', 180, './src/assets/the_wolf_of_wall_street.webp', 5.0),
(UUID_TO_BIN(UUID()), 'Frequency', 2000, 'Gregory Hoblit', 118, './src/assets/frequency.webp', 8.0),
(UUID_TO_BIN(UUID()), 'Watcher', 2022, 'Chloe Okuno', 96, './src/assets/watcher.webp', 8.0),
(UUID_TO_BIN(UUID()), 'Source Code', 2011, 'Duncan Jones', 93, './src/assets/source_code.webp', 8.0);

INSERT INTO `genre` (`name`) VALUES
('Action'),('Sci-fi'),('Thriller'), ('Drama'), ('Mystery'), ('Crime'), ('Horror');

-- Insertar datos en la tabla movie_genres
INSERT INTO `movie_genres` (`movie_id`, `genre_id`) VALUES
((SELECT id FROM movie WHERE title = 'Heretic'), (SELECT id FROM genre WHERE name = 'Horror')),
((SELECT id FROM movie WHERE title = 'Coherence'), (SELECT id FROM genre WHERE name = 'Sci-fi')),
((SELECT id FROM movie WHERE title = 'Oppenheimer'), (SELECT id FROM genre WHERE name = 'Drama')),
((SELECT id FROM movie WHERE title = 'The Game'), (SELECT id FROM genre WHERE name = 'Thriller')),
((SELECT id FROM movie WHERE title = 'Misantropo'), (SELECT id FROM genre WHERE name = 'Crime')),
((SELECT id FROM movie WHERE title = 'Blade Runner'), (SELECT id FROM genre WHERE name = 'Sci-fi')),
((SELECT id FROM movie WHERE title = 'Blade Runner 2049'), (SELECT id FROM genre WHERE name = 'Sci-fi')),
((SELECT id FROM movie WHERE title = 'Knock at the Cabin'), (SELECT id FROM genre WHERE name = 'Horror')),
((SELECT id FROM movie WHERE title = 'Dallas Buyers Club'), (SELECT id FROM genre WHERE name = 'Drama')),
((SELECT id FROM movie WHERE title = 'The Creator'), (SELECT id FROM genre WHERE name = 'Sci-fi')),
((SELECT id FROM movie WHERE title = 'The Wolf of Wall Street'), (SELECT id FROM genre WHERE name = 'Drama')),
((SELECT id FROM movie WHERE title = 'Frequency'), (SELECT id FROM genre WHERE name = 'Sci-fi')),
((SELECT id FROM movie WHERE title = 'Watcher'), (SELECT id FROM genre WHERE name = 'Thriller')),
((SELECT id FROM movie WHERE title = 'Source Code'), (SELECT id FROM genre WHERE name = 'Sci-fi'));
