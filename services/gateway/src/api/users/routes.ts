import * as Hapi from "hapi";

import UserHandler from "./user-handler";
import * as UserValidator from "./user-validator";
import { IDatabase } from "../../database/database";
import { IServerConfigurations } from "../../configs";

export default function (
  server: Hapi.Server,
  configs: IServerConfigurations,
  database: IDatabase
) {
  const userHandler = new UserHandler(configs, database);
  server.bind(userHandler);

  server.route([
    {
      method: "POST",
      path: "/users",
      options: {
        auth: false,
        handler: userHandler.createUser,
        tags: ["api", "users"],
        description: "Create a User.",
        validate: {
          payload: UserValidator.createUserModel
        },
        plugins: {
          "hapi-swagger": {
            responses: {
              "201": {
                description: "Created User."
              }
            }
          }
        }
      }
    },
    {
      method: "POST",
      path: "/users/login",
      options: {
        auth: false,
        handler: userHandler.loginUser,
        tags: ["api", "users"],
        description: "Login User.",
        validate: {
          payload: UserValidator.loginModel
        },
        plugins: {
          "hapi-swagger": {
            responses: {
              "200": {
                description: "Login User."
              }
            }
          }
        }
      }
    }
  ]);
}
