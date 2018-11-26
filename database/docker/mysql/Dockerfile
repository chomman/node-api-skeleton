FROM mariadb

ADD mysql.sql /docker-entrypoint-initdb.d

EXPOSE 3306 33060
CMD ["mysqld"]