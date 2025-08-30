import Joi from "joi";

export const crearPersonaSchema = Joi.object({
    nombre: Joi.string().min(2).max(150).required(),
    apellido: Joi.string().min(2).max(255).required(),
    ci: Joi.string().min(5).max(50).required(),
    telefono: Joi.string().min(7).max(50).required(),
    edad: Joi.number().integer().min(0).max(120).required(),
    correo: Joi.string().email().max(255).required(),
    password: Joi.string()
        .min(8)
        .max(128)
        .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*#?&]{8,}$"))
        .required(),
    rolId: Joi.number().integer().required(),
}).preferences({
    stripUnknown: true,
});
