import { Rol } from "../entities/rol.entity";
import { AppDataSource } from "../config/orm";

export class RolService {
    private readonly rolRepository = AppDataSource.getRepository(Rol);

    constructor() {}

    public async createRol(data: any): Promise<number> {
        const rolExiste = await this.rolRepository.findOneBy({
            nombre: data.nombre,
        });

        if (rolExiste) {
            throw new Error("Rol already exists");
        }

        const rol = await this.rolRepository.create(data);
        await this.rolRepository.save(rol);

        return 0;
    }

    public async getAllRol(): Promise<Rol[]> {
        return await this.rolRepository.find();
    }

    public async getByIdRol(id: number): Promise<Rol> {
        const rolExiste = await this.rolRepository.findOneBy({
            id,
        });

        if (!rolExiste) throw new Error("Rol not found");

        return rolExiste;
    }
}
