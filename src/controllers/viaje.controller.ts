import { Request, Response, NextFunction } from "express";
import { ViajeService } from "../services/viaje.service";
const viajeService = new ViajeService();

export async function createViaje(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const viaje = await viajeService.create(req.body);
        res.status(201).json(viaje);
    } catch (error) {
        next(error);
    }
}

export async function getAllViajesByUsuarioId(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { usuarioId } = req.params;
    try {
        const viajes = await viajeService.getAllViajes(Number(usuarioId));

        res.status(200).json(viajes);
    } catch (error) {
        next(error);
    }
}
