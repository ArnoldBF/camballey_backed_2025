import { Router } from "express";
import passport from "passport";
import { createTransporte } from "../controllers/transporte.controller";
import validatorHandler from "../middlewares/validatorHandler";
import { crearTransporteSchema } from "../schemas/transporte.schema";

const router = Router();

router.post(
    "/crear",
    passport.authenticate("jwt", { session: false }),
    validatorHandler(crearTransporteSchema, "body"),
    createTransporte
);

export default router;
