import * as nconf from "nconf";
import * as path from "path";
import { ConnectionOptions } from "typeorm";
import * as _ from "lodash";

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

export interface IProxyServiceConfig {
  host: string;
  port: number;
  protocol: 'http' | 'https';
  passThrough: boolean;
  redirects: number;
}

export interface IProxyService {
  tag: string;
  description: string;
  prefixPath: string;
  config: object;
}

export interface IProxyInfo {
  name: string;
  description: string;
}

export interface IProxyConfigurations {
  services: IProxyService[];
}

export function getDatabaseConfig(): ConnectionOptions[] {
  return configs.get("database");
}

export function getServerConfigs(): IServerConfigurations {
  return configs.get("server");
}

export function getProxyConfig(): IProxyConfigurations {
  return configs.get("proxy");
}

export function getProxiesInfo(): IProxyInfo[] {
  const r: IProxyInfo[] = [];
  const services = getProxyConfig().services || [];
  services.map(s => {
    r.push({
      name: s.tag,
      description: s.description
    });
  });

  return r;
}
