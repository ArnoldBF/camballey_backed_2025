import Joi from "joi";

export const cargarSaldoSchema = Joi.object({
    monto: Joi.number().positive().required(),
}).preferences({ stripUnknown: true });
