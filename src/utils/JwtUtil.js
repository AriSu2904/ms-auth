import jwt from "jsonwebtoken";
import {config} from "../../config/index.js";
import {ForbiddenError} from "./errorHandler.js";

const generateToken = async (id, username, userTag, email) => {
    return jwt.sign({
        user_id: id, username, user_dna: userTag, user_email: email,
    }, config.JWT_SECRET, {expiresIn: config.JWT_EXPIRY});
}

const authenticateToken = async (token) => {

    if (!token || !token.startsWith("Bearer ")) {
        return ForbiddenError("You're not allowed to access this resources!");
    }

    const tokenValue = token.split("Bearer ")[1];

    return jwt.verify(tokenValue, config.JWT_SECRET);
}

const decodeToken = async (token) => {
    const clearToken = token.split("Bearer ")[1];

    return jwt.decode(clearToken);
}

export {
    generateToken,
    authenticateToken,
    decodeToken
}