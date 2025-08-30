import { Saldo } from "../entities/saldo.entity";

import { AppDataSource } from "../config/orm";
import { Usuario } from "../entities/usuario.entity";

export class SaldoService {
    private readonly saldoRepository = AppDataSource.getRepository(Saldo);

    private readonly usuarioRepository = AppDataSource.getRepository(Usuario);

    constructor() {}

    public async cargarSaldo(data: any): Promise<number> {
        const usuarioExiste = await this.usuarioRepository.findOneBy({
            id: data.usuarioId,
        });

        if (!usuarioExiste) {
            throw new Error("Usuario not found");
        }

        if (data.monto <= 0) {
            throw new Error("monto invalido");
        }
        const saldoUsuario = await this.saldoRepository.create(data);
        await this.saldoRepository.save(saldoUsuario);

        return 0;
    }
}
