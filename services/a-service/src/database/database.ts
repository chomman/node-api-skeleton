import { createConnections, Connection, getConnection, ConnectionOptions } from 'typeorm';

export interface IDatabase {
    mongoConnection: Connection;
    mysqlConnection: Connection;
}

export async function init(config: ConnectionOptions[]): Promise<IDatabase> {
    await createConnections(config);
    return {
        mongoConnection: getConnection("mongodb"),
        mysqlConnection: getConnection("mysqldb")
    };
}