import mysql from "mysql2/promise";
import { envs, logger } from "../../config";

class DBInitializer {
    static execute = async () => {
        const dbConfig = {
            host: envs.DB_HOST,
            user: envs.DB_USER,
            password: envs.DB_PASSWORD,
            port: envs.DOCKER_PORT
        };

        const connection = await mysql.createConnection(dbConfig);

        try {
            await connection.beginTransaction();
            await connection.query("CREATE DATABASE IF NOT EXISTS jwt_login_db");
            await connection.query("USE jwt_login_db");
            await connection.query(`
            CREATE TABLE IF NOT EXISTS user (
                id_user INT PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(25) NOT NULL,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL
            )
        `);
            await connection.commit();
            logger.info("Database and table created successfully.");
        } catch (err) {
            await connection.rollback();
            logger.error(err);
        } finally {
            connection.end();
        }
    };
}

DBInitializer.execute();
