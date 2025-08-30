import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    OneToOne,
    ManyToOne,
    OneToMany,
} from "typeorm";
import { Persona } from "./persona.entity";
import { Saldo } from "./saldo.entity";
import { Rol } from "./rol.entity";
import { Viaje } from "./viaje.entity";

import { Transporte } from "./transporte.entity";

@Entity("usuarios")
export class Usuario {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 150 })
    userName!: string;

    @Column({ type: "varchar", length: 150 })
    password!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToOne(() => Persona, (persona) => persona.usuario)
    @JoinColumn({ name: "persona_id" })
    persona!: Persona;

    @OneToOne(() => Saldo, (saldo) => saldo.usuario)
    saldo!: Saldo;

    @ManyToOne(() => Rol, (rol) => rol.usuarios, {
        onDelete: "NO ACTION",
    })
    @JoinColumn({ name: "rol_id" })
    rol!: Rol;

    @OneToMany(() => Viaje, (viaje) => viaje.usuario)
    viajes!: Viaje[];

    @OneToOne(() => Transporte, (transporte) => transporte.chofer)
    transporte!: Transporte;
}
