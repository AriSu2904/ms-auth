import dotenv from "dotenv";

dotenv.config({path: '../.env'});

export const config = {
    SERVER_PORT: process.env.SERVER_PORT,
    DB_URI: process.env.DB_STRING,
    JWT_SECRET: process.env.JWT_SECRET
}