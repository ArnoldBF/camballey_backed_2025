import Joi from "joi";

export const crearRolSchema = Joi.object({
    nombre: Joi.string().min(2).max(150).required(),
    descripcion: Joi.string().max(255).optional(),
}).preferences({ stripUnknown: true });
