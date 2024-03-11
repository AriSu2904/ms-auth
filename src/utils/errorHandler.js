import {GraphQLError} from "graphql/error/index.js";

export const BadRequestError = (message) => {
    throw new GraphQLError(message, {
        extensions: {
            code: "BAD_REQUEST"
        }
    });
}

export const ForbiddenError = (message) => {
    throw new GraphQLError(message, {
        extensions: {
            code: "FORBIDDEN"
        }
    });
}