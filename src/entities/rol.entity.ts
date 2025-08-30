import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
import { Usuario } from "./usuario.entity";

@Entity("roles")
export class Rol {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 150 })
    nombre!: string;

    @Column({ type: "text" })
    Descripcion!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToMany(() => Usuario, (usuario) => usuario.rol)
    usuarios!: Usuario[];
}
