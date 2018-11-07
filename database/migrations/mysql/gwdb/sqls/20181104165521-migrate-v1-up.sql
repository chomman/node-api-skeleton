/* Replace with your SQL commands */
use gwdb;
create table if not exists users (
   id BIGINT(20) NOT NULL AUTO_INCREMENT,
   uuid VARCHAR(36) NOT NULL,
   email VARCHAR(100) NOT NULL UNIQUE,
   password VARCHAR(255) NOT NULL,
   name VARCHAR(100) NOT NULL,
   createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
   updateAt DATETIME DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY ( id )
);