import { Response, NextFunction } from "express";

export function extraerDatosJWT(req: any, res: Response, next: NextFunction) {
    const { rol, userName, sub } = req.user;

    if (!rol) {
        res.status(400).json({
            message: "Datos insuficientes en el token",
        });
    }

    req.rol = rol;
    req.userName = userName;
    req.sub = sub;
    next();
}
