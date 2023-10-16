CREATE DATABASE IF NOT EXISTS comment_db

USE comment_db

CREATE TABLE comment (
  id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  username      VARCHAR(255),
  email         VARCHAR(255),
  comment_text  TEXT,
  parent_id     INT DEFAULT NULL,
  tred_id       INT,
  file_path     TEXT,
  created       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ('id'),
)