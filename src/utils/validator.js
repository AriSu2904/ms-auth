import {GraphQLError} from "graphql/error/index.js";
import {config} from "../../config/index.js";

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

const switcher = (gender) => {
    if(gender === 'Laki-laki'){
        return 'boy';
    }else {
        return 'girl';
    }
}

export const generateImg = (gender, username) => {
    const currentGender = switcher(gender);

    return `${config.IMG_URI}/${currentGender}?username=${username}`;
}

export const isEqual = (val1, val2) => {
    return val1 === val2;
}