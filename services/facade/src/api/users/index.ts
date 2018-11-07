import * as Hapi from "hapi";

import Routes from "./routes";
import { IDatabase } from "../../database/database";
import { IServerConfigurations } from "../../configs";

export function init(
  server: Hapi.Server,
  configs: IServerConfigurations,
  database: IDatabase
) {
  Routes(server, configs, database);
}
