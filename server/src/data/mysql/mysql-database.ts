import mysql from "mysql2/promise";
import { envs } from "../../config";

const connection = mysql.createPool({
    host: envs.DB_HOST,
    user: envs.DB_USER,
    password: envs.DB_PASSWORD,
    database: envs.DB_DATABASE,
    port: envs.DOCKER_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

export default connection;
