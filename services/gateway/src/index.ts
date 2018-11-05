import * as Server from "./server";
import * as Database from "./database/database";
import * as Configs from "./configs";

// Init Database
const dbConfigs = Configs.getDatabaseConfig();

// Starting Application Server
const serverConfigs = Configs.getServerConfigs();

// Define async start function
const start = async ({ config }) => {
  try {
    const db = await Database.init(dbConfigs);
    const server = await Server.init(config, db);
    await server.start();
    console.log("Server running at:", server.info.uri);
  } catch (err) {
    console.error("Error starting server: ", err.message);
    throw err;
  }
};

console.log(`Running ${process.env.NODE_ENV || "dev"} enviroment`);

// Catch unhandling unexpected exceptions
process.on("uncaughtException", (error: Error) => {
  console.error(`uncaughtException ${error.message}`);
});

// Catch unhandling rejected promises
process.on("unhandledRejection", (reason: any) => {
  console.error(`unhandledRejection ${reason}`);
});

// Start the server
start({ config: serverConfigs });

