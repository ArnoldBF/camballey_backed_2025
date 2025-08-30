import { Request, Response, NextFunction } from "express";
import { RolService } from "../services/rol.service";
const rolService = new RolService();

export async function createRol(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const rol = await rolService.createRol(req.body);
        res.status(201).json(rol);
    } catch (error) {
        next(error);
    }
}

export async function getAllRol(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const roles = await rolService.getAllRol();
        res.status(200).json(roles);
    } catch (error) {
        next(error);
    }
}

export async function getRolById(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const rol = await rolService.getByIdRol(Number(req.params.id));
        res.status(200).json(rol);
    } catch (error) {
        next(error);
    }
}
