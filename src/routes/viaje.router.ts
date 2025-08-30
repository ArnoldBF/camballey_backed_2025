import { Router } from "express";
import passport from "passport";

import {
    createViaje,
    getAllViajesByUsuarioId,
} from "../controllers/viaje.controller";
import { crearViajeSchema } from "../schemas/viaje.schema";
import validatorHandler from "../middlewares/validatorHandler";

const router = Router();

router.post(
    "/crear",
    passport.authenticate("jwt", { session: false }),
    validatorHandler(crearViajeSchema, "body"),
    createViaje
);

router.get(
    "/all/:usuarioId",
    passport.authenticate("jwt", { session: false }),
    getAllViajesByUsuarioId
);

export default router;
