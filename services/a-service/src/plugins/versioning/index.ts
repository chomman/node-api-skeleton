import { IPlugin } from "../interfaces";
import * as Hapi from "hapi";
import { IRequest } from "../../common/interfaces/request";

const register = async (server: Hapi.Server): Promise<void> => {
  try {
    return server.register([
      {
        plugin: require('hapi-api-version'),
        options: {
          validVersions: [1, 2],
          defaultVersion: 1,
          vendorName: "versioningAPI"
        }
      }
    ]);
  } catch (err) {
    console.log(`Error registering hapi-api-version plugin: ${err}`);
  }
};

export default (): IPlugin => {
  return {
    register,
    info: () => {
      return { name: "Hapi Versioning Documentation", version: "1.0.0" };
    }
  };
};
