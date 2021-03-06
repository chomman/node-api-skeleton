import * as Hapi from "hapi";
import * as _ from 'lodash';

import { IPlugin } from "../interfaces";
import { getProxiesInfo } from '../../configs';

const register = async (server: Hapi.Server): Promise<void> => {
  try {
    return server.register([
      require("inert"),
      require("vision"),
      {
        plugin: require("hapi-swagger"),
        options: {
          info: {
            title: "My Api",
            description: "My Api Documentation",
            version: "1.0"
          },
          tags: _.concat([
            {
              name: "users",
              description: "Api users interface."
            }
          ], getProxiesInfo()),
          swaggerUI: true,
          documentationPage: true,
          documentationPath: "/docs"
        }
      }
    ]);
  } catch (err) {
    console.log(`Error registering swagger plugin: ${err}`);
  }
};

export default (): IPlugin => {
  return {
    register,
    info: () => {
      return { name: "Swagger Documentation", version: "1.0.0" };
    }
  };
};
