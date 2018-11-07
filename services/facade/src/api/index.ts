import * as Hapi from "hapi";

import { IDatabase } from "../database/database";
import { IServerConfigurations } from "../configs";
// Import apis
import * as AppProxy from "./proxy";
import * as User from "./users";

export function init(
  server: Hapi.Server,
  configs: IServerConfigurations,
  database: IDatabase
) {
  AppProxy.init(server);
  User.init(server, configs, database);
}