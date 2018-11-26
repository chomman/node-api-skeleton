CREATE DATABASE  IF NOT EXISTS `storedb`;
CREATE DATABASE  IF NOT EXISTS `gwdb`;

CREATE USER 'storeuser'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'storeuser'@'localhost' WITH GRANT OPTION;

CREATE USER 'storeuser'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'storeuser'@'%' WITH GRANT OPTION;
