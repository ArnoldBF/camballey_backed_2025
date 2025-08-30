import { Router } from "express";
import { postUsuario } from "../controllers/usuario.controller";
import validatorHandler from "../middlewares/validatorHandler";
import { crearPersonaSchema } from "../schemas/persona.schema";

const router = Router();

router.post(
    "/crear",
    validatorHandler(crearPersonaSchema, "body"),
    postUsuario
);

export default router;
