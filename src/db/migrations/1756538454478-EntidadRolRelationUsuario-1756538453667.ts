import { MigrationInterface, QueryRunner } from "typeorm";

export class EntidadRolRelationUsuario17565384536671756538454478 implements MigrationInterface {
    name = 'EntidadRolRelationUsuario17565384536671756538454478'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "nombre" character varying(150) NOT NULL, "Descripcion" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "rol_id" integer`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "FK_9e519760a660751f4fa21453d3e" FOREIGN KEY ("rol_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "FK_9e519760a660751f4fa21453d3e"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "rol_id"`);
        await queryRunner.query(`DROP TABLE "roles"`);
    }

}
