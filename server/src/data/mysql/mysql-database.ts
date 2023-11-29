import mysql from "mysql2/promise";
import { envs } from "../../config";

const connection = mysql.createPool({
    host: envs.DB_HOST,
    user: envs.DB_USER,
    password: envs.DB_PASSWORD,
    database: envs.DB_DATABASE,
    port: envs.DB_PORT
});

export default connection;
