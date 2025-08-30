import Joi from "joi";

export const crearViajeSchema = Joi.object({
    monto: Joi.number().positive().required(),
    usuarioId: Joi.number().integer().required(),
    transporteId: Joi.number().integer().required(),
}).preferences({ stripUnknown: true });
