import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Double,
    JoinColumn,
    ManyToOne,
} from "typeorm";

import { Usuario } from "./usuario.entity";
import { Transporte } from "./transporte.entity";

@Entity("viajes")
export class Viaje {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "decimal" })
    monto!: Double;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @ManyToOne(() => Usuario, (usuario) => usuario.viajes)
    @JoinColumn({ name: "usuario_id" })
    usuario!: Usuario;

    @ManyToOne(() => Transporte, (transporte) => transporte.viajes)
    @JoinColumn({ name: "transporte_id" })
    transporte!: Transporte;
}
