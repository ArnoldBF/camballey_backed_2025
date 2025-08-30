import Joi from "joi";

export const crearTipoTransporteSchema = Joi.object({
    nombre: Joi.string().min(2).max(150).required(),
}).preferences({ stripUnknown: true });
