import jwt from "jsonwebtoken";
import {config} from "../../config/index.js";
import {GraphQLError} from "graphql/error/index.js";

const generateToken = async (id, username, userTag, email) => {
    return jwt.sign({
        user_id: id, username, user_dna: userTag, user_email: email,
    }, config.JWT_SECRET, {expiresIn: config.JWT_EXPIRY});
}

const authenticateToken = async (token) => {

    if (!token || !token.startsWith("Bearer ")) {
        throw new GraphQLError("You're not allowed to access this resources!", {
            extensions: {
                code: "FORBIDDEN"
            }
        })
    }

    const tokenValue = token.split("Bearer ")[1];

    return jwt.verify(tokenValue, config.JWT_SECRET);
}

export {
    generateToken,
    authenticateToken
}