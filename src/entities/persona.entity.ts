import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
} from "typeorm";

import { Usuario } from "./usuario.entity";
@Entity("personas")
export class Persona {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 150 })
    nombre!: string;

    @Column({ type: "varchar", length: 255 })
    apellido!: string;

    @Column({ type: "varchar", length: 50 })
    ci!: string;

    @Column({ type: "varchar", length: 50 })
    telefono!: string;

    @Column()
    edad!: number;

    @Column({ type: "varchar", length: 255 })
    correo!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToOne(() => Usuario, (usuario) => usuario.persona)
    usuario!: Usuario;
}
