import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import boom from "@hapi/boom";
import { envConfig } from "../config/env";
import { Usuario } from "../entities/usuario.entity";
import { AppDataSource } from "../config/orm";
import { utimesSync } from "fs";

export class AuthService {
    private readonly usuarioRepository = AppDataSource.getRepository(Usuario);

    public async login(
        userNameParm: string,
        passwordParam: string
    ): Promise<Partial<Usuario>> {
        const usuario = await this.usuarioRepository.findOne({
            where: { userName: userNameParm },
            relations: ["rol"],
        });
        if (
            !usuario ||
            !usuario.password ||
            !(await bcrypt.compare(passwordParam, usuario.password))
        ) {
            throw boom.unauthorized();
        }

        const { password, ...usuarioSinPassword } = usuario;
        console.log(usuarioSinPassword);

        return usuarioSinPassword;
    }

    public signToken(usuario: any) {
        const payload = {
            sub: usuario.id,
            rol: usuario.rol.id,
            userName: usuario.userName,
            fullName: `${usuario.persona.nombre} ${usuario.persona.apellido}`,
        };

        if (!envConfig.jwtSecret) {
            throw new Error("JWT Secret is not defined");
        }

        const token = jwt.sign(payload, envConfig.jwtSecret, {
            expiresIn: "10min",
        });

        return {
            usuario,
            token,
        };
    }
}
