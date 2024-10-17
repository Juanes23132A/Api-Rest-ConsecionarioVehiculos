import config from "./default";
import mysql from "mysql2/promise"

export const getPoolConection = () => {
    const connection = mysql.createPool({
        host: config.HOST,
        port: config.PORT,
        user: config.USER,
        password: config.PASSWORD,
        database: config.DATABASE
    })
    return connection;
};