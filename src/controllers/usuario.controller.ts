import { Request, Response, NextFunction } from "express";

import { PersonaService } from "../services/persona.service";

const personaService = new PersonaService();

export async function postUsuario(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const persona = await personaService.createPerson(req.body);
        res.status(200).json(persona);
    } catch (error) {
        next(error);
    }
}
