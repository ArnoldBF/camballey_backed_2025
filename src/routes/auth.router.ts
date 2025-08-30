import { Router } from "express";
import passport from "passport";
import { login as loginController } from "../controllers/auth.controller";
import validatorHandler from "../middlewares/validatorHandler";
import { login as loginSchema } from "../schemas/login.schema";

const router = Router();

router.post(
    "/login",
    validatorHandler(loginSchema, "body"),
    passport.authenticate("local", { session: false }),
    loginController
);

export default router;
