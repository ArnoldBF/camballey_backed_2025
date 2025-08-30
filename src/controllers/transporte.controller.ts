import { Request, Response, NextFunction } from "express";
import { TransporteService } from "../services/transporte.service";
const transporteService = new TransporteService();

export async function createTransporte(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const transporte = await transporteService.create(req.body);
        res.status(201).json(transporte);
    } catch (error) {
        next(error);
    }
}
