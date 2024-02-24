import {GraphQLError} from "graphql/error/index.js";

export const validateInput = (schema, request) => {
    const result = schema.validate(request, {
        abortEarly: false,
        allowUnknown: false
    });

    if(result.error) {
        throw new GraphQLError(result.error.message, {
            extensions: {
                code: "BAD_REQUEST"
            }
        });
    }else {
        return result.value;
    }
}