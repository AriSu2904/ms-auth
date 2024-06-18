import { config } from "../../config/index.js";

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

export const isNotUndefined = (value) => {
    return value !== undefined;
}

export const isNotNull = (value) => {
    return value !== null;
}

export const isNotEmpty = (value) => {
    return isNotNull(value) || isNotUndefined(value);
}

export const authorizationHeaderCheck = (req) => {
    return req.headers.authorization &&
        isEqual(req.headers.authorization.split('Bearer ')[1]
            , req.headers.cookie.split('token=')[1]);
}