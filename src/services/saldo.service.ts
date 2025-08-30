import { Saldo } from "../entities/saldo.entity";
import { AppDataSource } from "../config/orm";
import { Usuario } from "../entities/usuario.entity";
import boom from "@hapi/boom";

interface ICargarSaldo {
    usuarioId: number;
    monto: number;
}

export class SaldoService {
    private readonly saldoRepository = AppDataSource.getRepository(Saldo);

    private readonly usuarioRepository = AppDataSource.getRepository(Usuario);

    constructor() {}

    public async cargarSaldo(data: ICargarSaldo): Promise<Saldo> {
        const usuarioExiste = await this.usuarioRepository.findOneBy({
            id: data.usuarioId,
        });

        if (!usuarioExiste) {
            throw boom.notFound("Usuario no encontrado");
        }

        if (data.monto <= 0) {
            throw boom.badRequest("Monto inválido");
        }

        let usuarioConSaldo = await this.saldoRepository.findOneBy({
            usuario: { id: usuarioExiste.id },
        });

        if (usuarioConSaldo) {
            usuarioConSaldo.monto =
                Number(usuarioConSaldo.monto) + Number(data.monto);
            await this.saldoRepository.save(usuarioConSaldo);
            return usuarioConSaldo;
        } else {
            const saldoUsuario = this.saldoRepository.create({
                usuario: usuarioExiste,
                monto: data.monto,
            });
            await this.saldoRepository.save(saldoUsuario);
            return saldoUsuario;
        }
    }

    public async getSaldobyUserId(usurioId: number): Promise<Saldo | null> {
        const usuarioExiste = await this.usuarioRepository.findOne({
            where: { id: usurioId },
        });
        if (!usuarioExiste) throw new Error("Usuario not found");
        const saldoUsuario = await this.saldoRepository.findOneBy({
            usuario: { id: usuarioExiste.id },
        });
        return saldoUsuario;
    }
}
