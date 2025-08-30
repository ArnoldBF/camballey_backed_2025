import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    CreateDateColumn,
    UpdateDateColumn,
    Double,
    JoinColumn,
} from "typeorm";

import { Usuario } from "./usuario.entity";

@Entity("saldos")
export class Saldo {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "decimal" })
    monto!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToOne(() => Usuario, (usuario) => usuario.saldo)
    @JoinColumn({ name: "usuario_id" })
    usuario!: Usuario;
}
