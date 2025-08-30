import { Persona } from "../entities/persona.entity";

import { AppDataSource } from "../config/orm";
import { Usuario } from "../entities/usuario.entity";
import { Rol } from "../entities/rol.entity";
import bycript from "bcrypt";
import { Double } from "typeorm";

interface ICrearPersona {
    nombre: string;
    apellido: string;
    ci: string;
    telefono: string;
    edad: number;
    correo: string;
    password: string;
    rolId: number;
}

export class PersonaService {
    private readonly personaRepository = AppDataSource.getRepository(Persona);

    private readonly usuarioRepository = AppDataSource.getRepository(Usuario);

    private readonly rolRepository = AppDataSource.getRepository(Rol);

    constructor() {}

    public async createPerson(data: ICrearPersona): Promise<number> {
        const correoExiste = await this.personaRepository.findOneBy({
            correo: data.correo,
        });

        const rolExiste = await this.rolRepository.findOneBy({
            id: data.rolId,
        });

        if (correoExiste) {
            throw new Error("Correo already exists");
        }
        if (!rolExiste) {
            throw new Error("Rol not found");
        }

        if (data.password) {
            data.password = await bycript.hash(data.password, 15);
        }

        const persona = await this.personaRepository.create(data);

        await this.personaRepository.save(persona);

        const userName = data.correo.split("@")[0];

        const nuevoUsuario = await this.usuarioRepository.create({
            userName: userName ?? "",
            password: data.password,
            persona: persona,
            rol: rolExiste,
        });

        await this.usuarioRepository.save(nuevoUsuario);

        return 0;
    }
}
