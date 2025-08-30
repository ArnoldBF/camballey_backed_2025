import Joi from "joi";

export const login = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string()
        .min(8)
        .max(128)
        .required(),
}).preferences({
    stripUnknown: true,
});
