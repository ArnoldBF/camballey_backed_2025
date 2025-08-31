import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { envConfig } from "../../../config/env";
import { Usuario } from "../../../entities/usuario.entity";
import { AppDataSource } from "../../../config/orm";
import jwt from "jsonwebtoken";

passport.use(
    new GoogleStrategy(
        {
            clientID: String(envConfig.googleClientId),
            clientSecret: String(envConfig.googleClientSecret),
            callbackURL:
                "https://camballeybacked2025-production.up.railway.app/api/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            const email = profile.emails?.[0]?.value ?? "";
            const userName = email ? email.split("@")[0] : "";

            if (!userName) {
                return done(
                    new Error("No se pudo obtener el userName de Google"),
                    undefined
                );
            }

            // Buscar usuario
            let usuario = await AppDataSource.getRepository(Usuario).findOne({
                where: { userName },
            });

            // Si no existe, crear usuario y persona mínimamente
            if (!usuario) {
                // Puedes buscar el rol por defecto (por ejemplo, "pasajero")
                const rolRepository = AppDataSource.getRepository("Rol");
                const rol = await rolRepository.findOne({
                    where: { nombre: "pasajero" },
                });

                if (!rol) {
                    return done(
                        new Error(
                            "No existe el rol 'pasajero' en la base de datos"
                        ),
                        undefined
                    );
                }

                // Crear persona
                const personaRepository =
                    AppDataSource.getRepository("Persona");
                const persona = personaRepository.create({
                    nombre: profile.displayName,
                    correo: email,
                });
                await personaRepository.save(persona);

                // Crear usuario
                usuario = AppDataSource.getRepository(Usuario).create({
                    userName,
                    password: "", // vacío para Google
                    persona,
                    rol,
                });
                await AppDataSource.getRepository(Usuario).save(usuario);
            }

            // Generar token JWT
            const payload = {
                sub: usuario.id,
                userName: usuario.userName,
            };
            const token = jwt.sign(payload, envConfig.jwtSecret, {
                expiresIn: "1h",
            });

            return done(null, { usuario, token });
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});
type User = {
    googleId: string;
    displayName: string;
    email?: string;
};

passport.deserializeUser((obj: User, done) => {
    done(null, obj);
});
