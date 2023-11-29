create database jwt_login;
use jwt_login;
CREATE TABLE user (
	id_user INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(25)NOT NULL,
    email VARCHAR(255)NOT NULL,
    password VARCHAR(255) NOT NULL
    );


select * from user;
