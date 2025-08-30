import { Rol } from "../entities/rol.entity";
import { AppDataSource } from "../config/orm";
import boom from "@hapi/boom";

interface ICreateRol {
    nombre: string;
    descripcion?: string;
}

export class RolService {
    private readonly rolRepository = AppDataSource.getRepository(Rol);

    constructor() {}

    public async createRol(data: ICreateRol): Promise<Rol> {
        const rolExiste = await this.rolRepository.findOneBy({
            nombre: data.nombre,
        });

        if (rolExiste) {
            throw boom.conflict("Rol ya existe");
        }

        const rol = await this.rolRepository.create(data);
        await this.rolRepository.save(rol);

        return rol;
    }

    public async getAllRol(): Promise<Rol[]> {
        return await this.rolRepository.find();
    }

    public async getByIdRol(id: number): Promise<Rol> {
        const rolExiste = await this.rolRepository.findOneBy({
            id,
        });

        if (!rolExiste) throw boom.notFound("Rol no encontrado");

        return rolExiste;
    }
}
