/* eslint-disable newline-per-chained-call */
import joi from 'joi';

function validateUser(user) {
    const schema = joi.object({
        name: joi.string().min(1).max(30).regex(/^[A-Za-z]+$/).required(),
        email: joi.string().email().required(),
        password: joi.string().min(4).required(),
    }).unknown();
    return schema.validate(user).error;
}

function validateLogin(data) {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required(),
    }).unknown();
    return schema.validate(data).error;
}

export {
    validateUser,
    validateLogin,
};
