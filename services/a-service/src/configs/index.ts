import * as nconf from "nconf";
import * as path from "path";
import { ConnectionOptions } from 'typeorm';

//Read Configurations
const configs = new nconf.Provider({
  env: true,
  argv: true,
  store: {
    type: "file",
    file: path.join(__dirname, `./config.${process.env.NODE_ENV || "dev"}.json`)
  }
});

export interface IServerConfigurations {
  port: number;
  plugins: Array<string>;
  jwtSecret: string;
  jwtExpiration: string;
  routePrefix: string;
}

export function getDatabaseConfig(): ConnectionOptions[] {
  return configs.get("database");
}

export function getServerConfigs(): IServerConfigurations {
  return configs.get("server");
}
