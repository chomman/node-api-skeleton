import { ConnectionOptions } from 'typeorm';

//Read Configurations
const configs = require(`./config.${process.env.NODE_ENV || "dev"}`);

export interface IServerConfigurations {
  port: number;
  plugins: Array<string>;
  jwtSecret: string;
  jwtExpiration: string;
  routePrefix: string;
}

export function getDatabaseConfig(): ConnectionOptions[] {
  return configs.database;
}

export function getServerConfigs(): IServerConfigurations {
  return configs.server;
}
