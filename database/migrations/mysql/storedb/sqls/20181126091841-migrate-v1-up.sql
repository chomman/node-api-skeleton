/* Replace with your SQL commands */
use storedb;

create table categories (
   id          serial                   not null,
   name        varchar(255)             not null,
   parent_id   integer                          ,
   created_at timestamp  not null default CURRENT_TIMESTAMP,
   updated_at  timestamp  not null default CURRENT_TIMESTAMP,
   constraint pk_categories primary key (id)
)   ENGINE=InnoDB DEFAULT CHARSET=latin1;
create table products (
   id                serial                   not null      ,
   sku               varchar(255)             not null      ,
   name              varchar(255)             not null      ,
   description       text                                   ,
   product_status_id integer                  not null      ,
   regular_price     numeric                   default 0    ,
   discount_price    numeric                   default 0    ,
   quantity          integer                   default 0    ,
   taxable           bool                      default false,
   created_at timestamp  not null default CURRENT_TIMESTAMP,
   updated_at  timestamp  not null default CURRENT_TIMESTAMP,
   constraint pk_products primary key (id)
)   ENGINE=InnoDB DEFAULT CHARSET=latin1;
create table tags (
   id          serial                   not null,
   name        varchar(255)             not null,
   created_at timestamp  not null default CURRENT_TIMESTAMP,
   updated_at  timestamp  not null default CURRENT_TIMESTAMP,
   constraint pk_tags primary key (id)
)   ENGINE=InnoDB DEFAULT CHARSET=latin1;
create table sales_orders (
   id          serial                   not null,
   order_date  date                     not null,
   total       numeric                  not null,
   coupon_id   integer                          ,
   session_id  varchar(255)             not null,
   user_id     integer                  not null,
   created_at timestamp  not null default CURRENT_TIMESTAMP,
   updated_at  timestamp  not null default CURRENT_TIMESTAMP,
   constraint pk_sales_orders primary key (id)
)   ENGINE=InnoDB DEFAULT CHARSET=latin1;
create table coupons (
   id          serial                   not null      ,
   code        varchar(255)             not null      ,
   description text                                   ,
   active      bool                      default true ,
   value       numeric                                ,
   multiple    bool                      default false,
   start_date  timestamp                ,
   end_date    timestamp                ,
   created_at timestamp  not null default CURRENT_TIMESTAMP,
   updated_at  timestamp  not null default CURRENT_TIMESTAMP,
   constraint pk_coupons primary key (id)
)   ENGINE=InnoDB DEFAULT CHARSET=latin1;
create table product_tags (
   product_id  integer                  not null,
   tag_id      integer                  not null,
   created_at timestamp  not null default CURRENT_TIMESTAMP,
   updated_at  timestamp  not null default CURRENT_TIMESTAMP,
   constraint pk_product_tags primary key (product_id,tag_id)
)   ENGINE=InnoDB DEFAULT CHARSET=latin1;
create table cc_transactions (
   id                 serial                   not null,
   code               varchar(255)                     ,
   order_id           integer                  not null,
   transdate          timestamp          ,
   processor          varchar(255)             not null,
   processor_trans_id varchar(255)             not null,
   amount             numeric                  not null,
   cc_num             varchar(255)                     ,
   cc_type            varchar(255)                     ,
   response           text                             ,
   created_at timestamp  not null default CURRENT_TIMESTAMP,
   updated_at  timestamp  not null default CURRENT_TIMESTAMP,
   constraint pk_cc_transactions primary key (id)
)   ENGINE=InnoDB DEFAULT CHARSET=latin1;
create table sessions (
   id          varchar(255)             not null,
   data        text                             ,
   created_at timestamp  not null default CURRENT_TIMESTAMP,
   updated_at  timestamp  not null default CURRENT_TIMESTAMP,
   constraint pk_sessions primary key (id)
)   ENGINE=InnoDB DEFAULT CHARSET=latin1;
create table product_statuses (
   id          serial                   not null,
   name        varchar(255)             not null,
   created_at timestamp  not null default CURRENT_TIMESTAMP,
   updated_at  timestamp  not null default CURRENT_TIMESTAMP,
   constraint pk_product_statuses primary key (id)
)   ENGINE=InnoDB DEFAULT CHARSET=latin1;
create table product_categories (
   category_id integer                  not null,
   product_id  integer                  not null,
   created_at timestamp  not null default CURRENT_TIMESTAMP,
   updated_at  timestamp  not null default CURRENT_TIMESTAMP,
   constraint pk_product_categories primary key (category_id,product_id)
)   ENGINE=InnoDB DEFAULT CHARSET=latin1;
create table order_products (
   id          serial                   not null,
   order_id    integer                          ,
   sku         varchar(255)             not null,
   name        varchar(255)             not null,
   description text                             ,
   price       numeric                  not null,
   quantity    integer                  not null,
   subtotal    numeric                  not null,
   created_at timestamp  not null default CURRENT_TIMESTAMP,
   updated_at  timestamp  not null default CURRENT_TIMESTAMP,
   constraint pk_order_products primary key (id)
)   ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- get_view_create

-- get_permissions_create

-- get_inserts

-- get_smallpackage_post_sql

-- get_associations_create
alter table sales_orders add constraint fk_session_sales_order 
    foreign key (session_id)
    references sessions (id) ;