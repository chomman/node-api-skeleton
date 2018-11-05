import { createConnections, Connection, getConnection, ConnectionOptions } from 'typeorm';

export interface IDatabase {
    mysqlConnection: Connection;
}

export async function init(config: ConnectionOptions[]): Promise<IDatabase> {
    await createConnections(config);
    return {
        mysqlConnection: getConnection("mysqldb")
    };
}