import * as Hapi from "hapi";

import { IDatabase } from "../database/database";
import { IServerConfigurations } from "../configs";
// Import apis
import * as Home from "./home";
import * as Members from "./members";

export function init(
  server: Hapi.Server,
  configs: IServerConfigurations,
  database: IDatabase
) {
  Home.init(server);
  Members.init(server, configs, database);
}