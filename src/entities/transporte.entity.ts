import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from "typeorm";
import { TipoTransporte } from "./tipoTransporte.entity";

import { Viaje } from "./viaje.entity";

@Entity("transportes")
export class Transporte {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 150 })
    placa!: string;

    @Column({ type: "varchar", length: 150 })
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
}
