/* Replace with your SQL commands */
use gwdb;
create table users (
   id          serial                   not null     ,
   uuid        varchar(36)              not null     ,
   email       varchar(255)             not null     ,
   password    varchar(255)             not null     ,
   active      bool                      default true,
   created_at timestamp not null     default CURRENT_TIMESTAMP,
   updated_at  timestamp not null     default CURRENT_TIMESTAMP,
   constraint pk_users primary key (id)
)   ENGINE=InnoDB DEFAULT CHARSET=latin1;
create table roles (
   id          serial                   not null,
   name        varchar(255)             not null,
   created_at timestamp  not null default CURRENT_TIMESTAMP,
   updated_at  timestamp  not null default CURRENT_TIMESTAMP,
   constraint pk_roles primary key (id)
)   ENGINE=InnoDB DEFAULT CHARSET=latin1;
create table user_roles (
   user_id     integer                  not null,
   role_id     integer                  not null,
   created_at timestamp  not null default CURRENT_TIMESTAMP,
   updated_at  timestamp  not null default CURRENT_TIMESTAMP,
   constraint pk_user_roles primary key (user_id,role_id)
)   ENGINE=InnoDB DEFAULT CHARSET=latin1;