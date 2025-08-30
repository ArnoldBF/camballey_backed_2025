import { Request, Response, NextFunction } from "express";
import { TipoTransporteService } from "../services/tipoTranposrte.service";
const tipoTransporteService = new TipoTransporteService();

export async function createTipoTransporte(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const tipo = await tipoTransporteService.create(req.body);
        res.status(201).json(tipo);
    } catch (error) {
        next(error);
    }
}

export async function getAllTipoTransporte(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const tipos = await tipoTransporteService.getAll();
        res.status(200).json(tipos);
    } catch (error) {
        next(error);
    }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
    const { tipoTransporteId } = req.params;
    try {
        const tipo = await tipoTransporteService.getById(
            Number(tipoTransporteId)
        );
        res.status(200).json(tipo);
    } catch (error) {
        next(error);
    }
}
