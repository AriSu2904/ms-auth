import "dotenv/config.js";

export const config = {
    SERVER_PORT: process.env.SERVER_PORT,
    DB_URI: process.env.DB_STRING,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY
}