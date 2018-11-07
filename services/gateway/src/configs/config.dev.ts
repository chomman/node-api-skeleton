module.exports = {
  database: [
    {
      name: "mysqldb",
      type: "mysql",
      host: process.env.MYSQL_HOST || "localhost",
      port: process.env.MYSQL_PORT || 3306,
      username: process.env.MYSQL_USERNAME || "root",
      password: process.env.MYSQL_PASSWORD || "admin",
      database: process.env.MYSQL_DATABASE || "gwdb",
      entities: ["build/database/entities/mysql/*.js"]
    }
  ],
  server: {
    port: 8080,
    jwtSecret: "random-secret-password",
    jwtExpiration: "1h",
    plugins: ["logger", "swagger", "jwt-auth"]
  },
  proxy: {
    services: [
      {
        tag: "a",
        description: "Documentation for service A",
        prefixPath: "a",
        config: {
          host: process.env.A_SERVICE_HOST || "localhost",
          port: process.env.A_SERVICE_PORT || 5000,
          protocol: "http",
          passThrough: true,
          redirects: 5
        }
      }
    ]
  }
};
