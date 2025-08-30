import { Router } from "express";
import {
    createRol,
    getAllRol,
    getRolById,
} from "../controllers/rol.controller";
import validatorHandler from "../middlewares/validatorHandler";
import { crearRolSchema } from "../schemas/rol.schema";

const router = Router();

router.post("/crear", validatorHandler(crearRolSchema, "body"), createRol);

router.get("/", getAllRol);
router.get("/:id", getRolById);

export default router;
