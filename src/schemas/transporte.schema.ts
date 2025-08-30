import Joi from "joi";

export const crearTransporteSchema = Joi.object({
    tipoTransporteId: Joi.number().integer().required(),
    placa: Joi.string().min(3).max(150).required(),
    interno: Joi.string().min(3).max(150).required(),
    linea: Joi.string().max(150).optional(),
    usuarioId: Joi.number().integer().required(),
}).preferences({ stripUnknown: true });
