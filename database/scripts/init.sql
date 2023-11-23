CREATE DATABASE fpd_dev;

GRANT all privileges on *.* to 'nakkim'@'%' WITH GRANT option;
FLUSH PRIVILEGES;

USE fpd_dev;

CREATE TABLE `auth_user` (
  `uid` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `name` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `post` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `uid` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'user uid',
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `author` (`uid`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `auth_user` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `comment` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `post_id` int unsigned NOT NULL,
  `uid` varchar(100) NOT NULL,
  `name` varchar(30) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `auth_user` (`uid`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `auth_salt` (
  `uid` varchar(100) NOT NULL,
  `salt` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`),
  CONSTRAINT `auth_salt_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `auth_user` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;