module.exports = {
  database: [
    {
      name: "mongodb",
      type: "mongodb",
      host: process.env.MONGO_HOST || 'localhost',
      port: process.env.MONGO_PORT || 27017,
      database: "internal-db-dev",
      entities: ["build/database/entities/mongo/*.js"],
      cache: {
        type: "redis",
        options: {
            host: process.env.REDIS_HOST || "localhost",
            port: process.env.REDIS_PORT || 6379
        }
      }
    },
    {
      name: "mysqldb",
      type: "mysql",
      host: process.env.MYSQL_HOST || "localhost",
      port: process.env.MYSQL_PORT || 3306,
      username: process.env.MYSQL_USERNAME || "root",
      password: process.env.MYSQL_PASSWORD || "admin",
      database: process.env.MYSQL_DATABASE || "mydb",
      entities: ["build/database/entities/mysql/*.js"]
    }
  ],
  server: {
    port: 5000,
    jwtSecret: "random-secret-password",
    jwtExpiration: "1h",
    routePrefix: "/a",
    plugins: ["logger", "swagger", "versioning"]
  }
};
