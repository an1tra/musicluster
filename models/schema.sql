DROP DATABASE IF EXISTS users_db;
CREATE DATABASE users_db;

USE users_db

CREATE TABLE users(
    id int NOT NULL AUTO_INCREMENT,
    album: varchar(70),
    PRIMARY KEY (id)
);