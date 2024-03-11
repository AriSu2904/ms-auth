import "dotenv/config.js";

export const config = {
    SERVER_PORT: process.env.SERVER_PORT,
    DB_URI: process.env.DB_STRING,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY,
    SMPT_HOST: process.env.SMPT_HOST,
    SMPT_PORT: process.env.SMPT_PORT,
    SMPT_MAIL: process.env.SMPT_MAIL,
    SMPT_PASS: process.env.SMPT_APP_PASS,
    SMPT_SERVICE: process.env.SMPT_SERVICE
}