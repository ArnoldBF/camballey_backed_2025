import { TipoTransporte } from "../entities/tipoTransporte.entity";
import { AppDataSource } from "../config/orm";
import boom from "@hapi/boom";
import { NumberSchema } from "joi";

interface ICreateTipoTransporte {
    nombre: string;
}

export class TipoTransporteService {
    private readonly tipoTransporteRepository =
        AppDataSource.getRepository(TipoTransporte);

    constructor() {}

    public async create(data: ICreateTipoTransporte): Promise<TipoTransporte> {
        const tipoExiste = await this.tipoTransporteRepository.findOneBy({
            nombre: data.nombre,
        });

        if (tipoExiste) throw boom.conflict("TipoTransporte ya existe");

        const tipo = this.tipoTransporteRepository.create(data);
        await this.tipoTransporteRepository.save(tipo);

        return tipo;
    }

    public async getAll(): Promise<TipoTransporte[]> {
        return await this.tipoTransporteRepository.find();
    }

    public async getById(tipoTransporteId: number): Promise<TipoTransporte> {
        const tipoTransporteExiste =
            await this.tipoTransporteRepository.findOneBy({
                id: tipoTransporteId,
            });

        if (!tipoTransporteExiste)
            throw boom.badRequest("TipoTransporte not found");

        return tipoTransporteExiste;
    }
}
