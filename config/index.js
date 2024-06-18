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
    SMPT_SERVICE: process.env.SMPT_SERVICE,
    IMG_URI: process.env.IMAGE_URI,
    ERROR_MESSAGE: {
        UNAUTHORIZED: 'You are not authorized!',
        FORBIDDEN: 'You are not allowed to access this resources!',
        BAD_REQUEST: 'Incorrect data, make sure you have valid account!',
        NOT_FOUND: 'Data not found!',
        DUPLICATE_EMAIL: 'Registration failed, due to duplicate email!'

    },
    ERROR_CODE: {
        400: '400 | BAD_REQUEST',
        401: '401 | UNAUTHORIZED',
        403: '403 | FORBIDDEN',
        404: '404 | NOT_FOUND'
    },
    USER_STATUS: {
        VERIFIED: 'VERIFIED',
        UNREGISTERED: 'UNREGISTERED'
    }
}