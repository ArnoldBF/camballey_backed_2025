import { Viaje } from "../entities/viaje.entity";
import { AppDataSource } from "../config/orm";
import { Usuario } from "../entities/usuario.entity";
import { Transporte } from "../entities/transporte.entity";
import { Saldo } from "../entities/saldo.entity";
import boom from "@hapi/boom";

interface ICreateViaje {
    monto: number;
    usuarioId: number;
    transporteId: number;
}

export class ViajeService {
    private readonly viajeRepository = AppDataSource.getRepository(Viaje);
    private readonly usuarioRepository = AppDataSource.getRepository(Usuario);
    private readonly transporteRepository =
        AppDataSource.getRepository(Transporte);
    private readonly saldoRepository = AppDataSource.getRepository(Saldo);

    constructor() {}

    public async create(data: ICreateViaje) {
        const pasajero = await this.usuarioRepository.findOne({
            where: { id: data.usuarioId },
            relations: ["rol", "saldo"],
        });

        // Buscar transporte y chofer
        const transporte = await this.transporteRepository.findOne({
            where: { id: data.transporteId },
            relations: ["chofer", "chofer.rol"], // Asumiendo que transporte tiene relación con usuario chofer
        });

        const chofer = transporte?.chofer;

        if (!pasajero || !chofer)
            throw boom.notFound("Usuario o chofer no encontrado");
        if (pasajero.rol.nombre !== "pasajero")
            throw boom.badRequest("El usuario no es pasajero");
        if (chofer.rol.nombre !== "chofer")
            throw boom.badRequest("El usuario no es chofer");

        // Buscar saldos
        const saldoPasajero = await this.saldoRepository.findOne({
            where: { usuario: { id: pasajero.id } },
        });
        const saldoChofer = await this.saldoRepository.findOne({
            where: { usuario: { id: chofer.id } },
        });

        if (!saldoPasajero || !saldoChofer)
            throw boom.notFound("Saldo no encontrado");

        // Validar saldo suficiente
        if (saldoPasajero.monto < data.monto)
            throw boom.badRequest("Saldo insuficiente");

        // Descontar al pasajero y abonar al chofer
        saldoPasajero.monto = Number(saldoPasajero.monto) - Number(data.monto);
        saldoChofer.monto = Number(saldoChofer.monto) + Number(data.monto);

        await this.saldoRepository.save(saldoPasajero);
        await this.saldoRepository.save(saldoChofer);

        // Registrar el viaje
        const viaje = this.viajeRepository.create({
            monto: data.monto,
            usuario: pasajero,
            transporte: transporte,
        });

        const viajeGuardado = await this.viajeRepository.save(viaje);

        return viajeGuardado;
    }

    public async getAllViajes(usuarioId: number): Promise<Viaje[]> {
        return await this.viajeRepository.find({
            where: {
                usuario: {
                    id: usuarioId,
                },
            },

            relations: ["transporte"],
        });
    }
}
