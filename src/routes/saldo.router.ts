import { Router } from "express";
import passport from "passport";
import {
    cargarSaldo,
    getSaldoByUsuarioId,
} from "../controllers/saldo.controller";
import { cargarSaldoSchema } from "../schemas/saldo.schem";
import validatorHandler from "../middlewares/validatorHandler";

const router = Router();

router.post(
    "/cargar/:usuarioId",
    passport.authenticate("jwt", { session: false }),
    validatorHandler(cargarSaldoSchema, "body"),
    cargarSaldo
);

router.get(
    "/:usuarioId",
    passport.authenticate("jwt", { session: false }),
    getSaldoByUsuarioId
);

export default router;
