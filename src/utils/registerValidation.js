import Joi from 'joi';

export const registerValidation = Joi.object({
    firstName: Joi.string().alphanum().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'test'] } }).required(),
    mobilePhone: Joi.string().alphanum(),
    gender: Joi.string().pattern(/^(Laki-laki|Perempuan)$/),
    birthDate: Joi.date().required(),
    userTag: Joi.string().required().alphanum(),
    username: Joi.string().required().alphanum(),
    password: Joi.string().pattern(new RegExp("^.{8,}$"))
});

