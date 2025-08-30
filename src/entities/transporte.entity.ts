import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
    OneToOne,
} from "typeorm";
import { TipoTransporte } from "./tipoTransporte.entity";

import { Viaje } from "./viaje.entity";
import { Usuario } from "./usuario.entity";

@Entity("transportes")
export class Transporte {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 150 })
    placa!: string;

    @Column({ type: "varchar", length: 150, unique: true })
    interno!: string;

    @Column({ type: "varchar", length: 150, nullable: true })
    linea!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @ManyToOne(
        () => TipoTransporte,
        (tipoTransporte) => tipoTransporte.transportes,
        {
            onDelete: "NO ACTION",
        }
    )
    @JoinColumn({ name: "tipo_transporte_id" })
    tipoTransporte!: TipoTransporte;

    @OneToMany(() => Viaje, (viaje) => viaje.transporte)
    viajes!: Viaje[];

    @OneToOne(() => Usuario, (usuario) => usuario.transporte)
    @JoinColumn({ name: "usuario_id" })
    chofer!: Usuario;
}
