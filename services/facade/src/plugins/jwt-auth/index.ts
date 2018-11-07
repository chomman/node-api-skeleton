import * as Hapi from "hapi";

import { IPluginOptions, IPlugin } from "../interfaces";
import { User } from '../../database/entities/mysql/user';

const register = async (
  server: Hapi.Server,
  options: IPluginOptions
): Promise<void> => {
  try {
    const database = options.database;
    const serverConfig = options.serverConfigs;

    const validateUser = async (
      decoded: any
    ) => {
      const userRepository = await database.mysqlConnection.getRepository(User);
      const user = await userRepository.findOne(decoded.id);
      if (!user) {
        return { isValid: false };
      }

      return { isValid: true };
    };

    await server.register(require("hapi-auth-jwt2"));

    return setAuthStrategy(server, {
      config: serverConfig,
      validate: validateUser
    });
  } catch (err) {
    console.log(`Error registering jwt plugin: ${err}`);
    throw err;
  }
};

const setAuthStrategy = async (server, { config, validate }) => {
  server.auth.strategy("jwt", "jwt", {
    key: config.jwtSecret,
    validate,
    verifyOptions: {
      algorithms: ["HS256"]
    }
  });

  server.auth.default("jwt");

  return;
};

export default (): IPlugin => {
  return {
    register,
    info: () => {
      return { name: "JWT Authentication", version: "1.0.0" };
    }
  };
};
