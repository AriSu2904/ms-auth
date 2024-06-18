import Joi from 'joi';
import { config } from "../../config/index.js";
import { GraphQLError } from "graphql/error/index.js";

const validateInput = (schema, request) => {
    const result = schema.validate(request, {
        abortEarly: false,
        allowUnknown: false
    });

    if(result.error) {
        throw new GraphQLError(result.error.message, {
            extensions: {
                code: config.ERROR_CODE["400"]
            }
        });
    }else {
        return result.value;
    }
}

const profileSchema = Joi.object({
    firstName: Joi.string().alphanum().min(3),
    lastName: Joi.string().min(3),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'test'] } }),
    mobilePhone: Joi.string().alphanum(),
    gender: Joi.string().pattern(/^(Laki-laki|Perempuan)$/),
    birthDate: Joi.string().isoDate(),
    profilePicture: Joi.string(),
    bio: Joi.string()
})

const registrationSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'test'] } }).required(),
    username: Joi.string().required().alphanum(),
    password: Joi.string().pattern(new RegExp("^.{8,}$")),
    profile: profileSchema
});

export {
    validateInput,
    registrationSchema,
    profileSchema
}