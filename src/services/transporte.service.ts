import { Transporte } from "../entities/transporte.entity";
import { AppDataSource } from "../config/orm";
import { TipoTransporte } from "../entities/tipoTransporte.entity";
import { Usuario } from "../entities/usuario.entity";
import boom from "@hapi/boom";

interface ICreateTransporte {
    tipoTransporteId: number;
    placa: string;
    interno: string;
    linea?: string;
    usuarioId: number;
}

export class TransporteService {
    private readonly transporteRepository =
        AppDataSource.getRepository(Transporte);

    private readonly tipoTransporteRepository =
        AppDataSource.getRepository(TipoTransporte);

    private readonly usuarioRepository = AppDataSource.getRepository(Usuario);

    constructor() {}

    public async create(data: ICreateTransporte): Promise<Transporte> {
        const tipoExiste = await this.tipoTransporteRepository.findOneBy({
            id: data.tipoTransporteId,
        });

        const chofer = await this.usuarioRepository.findOne({
            where: {
                id: data.usuarioId,
            },
            relations: ["rol"],
        });

        if (!chofer) throw boom.notFound("Usuario no encontrado");
        if (chofer.rol.nombre !== "chofer")
            throw boom.badRequest("El usuario no es chofer");
        if (!tipoExiste) throw boom.notFound("TipoTransporte no encontrado");

        const transporte = await this.transporteRepository.create({
            ...data,
            chofer: chofer,
        });

        const transporteGuardado = await this.transporteRepository.save(
            transporte
        );

        return transporteGuardado;
    }
}
