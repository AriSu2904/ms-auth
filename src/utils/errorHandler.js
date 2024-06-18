import { GraphQLError } from "graphql/error/index.js";
import { config } from "../../config/index.js";

export const BadRequestError = (message) => {
    throw new GraphQLError(message, {
        extensions: {
            code: config.ERROR_CODE["400"]
        }
    });
}

export const ForbiddenError = (message) => {
    throw new GraphQLError(message, {
        extensions: {
            code: config.ERROR_CODE["403"]
        }
    });
}

export const NotFoundError = (message) => {
    throw new GraphQLError(message, {
        extensions: {
            code: config.ERROR_CODE["404"]
        }
    })
}