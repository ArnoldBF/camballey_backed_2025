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

router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login",
        session: false,
    }),
    (req, res) => {
        res.json({ user: req.user });
    }
);

export default router;
