/* eslint-disable newline-per-chained-call */
import joi from 'joi';

function validateSubscription(sub) {
    const schema = joi.object({
        fullName: joi.string().min(1).max(50),
        address: joi.string().min(3).regex(/\d/).regex(/[a-zA-Z]/).required(),
        zipCode: joi.string().length(9).regex(/^[0-9]{5}-[0-9]{3}$/).required(),
        city: joi.string().min(1).required(),
        stateId: joi.number().min(1).max(27).required(),
        deliveryDate: joi.string().min(1).equal('Segunda', 'Quarta', 'Sexta', '1', '10', '20').required(),
    }).unknown();
    return schema.validate(sub).error;
}
export {
    validateSubscription,
};
