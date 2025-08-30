import { Request, Response, NextFunction } from "express";
import { SaldoService } from "../services/saldo.service";
import { utimesSync } from "fs";
const saldoService = new SaldoService();

export async function cargarSaldo(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { usuarioId } = req.params;
    try {
        const data = {
            ...req.body,
            usuarioId: Number(usuarioId),
        };
        const saldo = await saldoService.cargarSaldo(data);
        res.status(200).json(saldo);
    } catch (error) {
        next(error);
    }
}

export async function getSaldoByUsuarioId(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const usuarioId = Number(req.params.usuarioId);
        const saldo = await saldoService.getSaldobyUserId(usuarioId);
        res.status(200).json(saldo);
    } catch (error) {
        next(error);
    }
}
