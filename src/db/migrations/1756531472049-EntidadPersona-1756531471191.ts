import { MigrationInterface, QueryRunner } from "typeorm";

export class EntidadPersona17565314711911756531472049 implements MigrationInterface {
    name = 'EntidadPersona17565314711911756531472049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "personas" ("id" SERIAL NOT NULL, "nombre" character varying(150) NOT NULL, "apellido" character varying(255) NOT NULL, "ci" character varying(50) NOT NULL, "telefono" character varying(50) NOT NULL, "edad" integer NOT NULL, "correo" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_714aa5d028f8f3e6645e971cecd" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "personas"`);
    }

}
