import Joi from 'joi';

export const profileUpdateValidation = Joi.object({
    firstName: Joi.string().alphanum().min(3),
    lastName: Joi.string().min(3),
    mobilePhone: Joi.string().alphanum(),
    birthDate: Joi.string().isoDate(),
    userTag: Joi.string().alphanum().min(5)
});

