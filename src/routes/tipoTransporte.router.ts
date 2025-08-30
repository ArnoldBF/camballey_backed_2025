import { Router } from "express";
import {
    createTipoTransporte,
    getAllTipoTransporte,
    getById,
} from "../controllers/tipoTransporte.controller";
import { crearTipoTransporteSchema } from "../schemas/tipoTransporte.schema";
import validatorHandler from "../middlewares/validatorHandler";
import passport from "passport";

const router = Router();

router.post(
    "/crear",
    passport.authenticate("jwt", { session: false }),
    validatorHandler(crearTipoTransporteSchema, "body"),
    createTipoTransporte
);
router.get("/", getAllTipoTransporte);

router.get(
    "/:tipoTransporteId",
    passport.authenticate("jwt", { session: false }),
    getById
);

export default router;
