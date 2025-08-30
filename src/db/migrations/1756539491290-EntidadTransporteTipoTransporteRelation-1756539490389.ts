import { MigrationInterface, QueryRunner } from "typeorm";

export class EntidadTransporteTipoTransporteRelation17565394903891756539491290 implements MigrationInterface {
    name = 'EntidadTransporteTipoTransporteRelation17565394903891756539491290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tipo_transportes" ("id" SERIAL NOT NULL, "nombre" character varying(150) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6ff2a8524019840231d60efc5e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transportes" ("id" SERIAL NOT NULL, "placa" character varying(150) NOT NULL, "interno" character varying(150) NOT NULL, "linea" character varying(150), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "tipo_transporte_id" integer, CONSTRAINT "PK_92cfbcdb650f1c6a4c0be3c1ee5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transportes" ADD CONSTRAINT "FK_d9b43f03397309f709b7d0aa6a6" FOREIGN KEY ("tipo_transporte_id") REFERENCES "tipo_transportes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transportes" DROP CONSTRAINT "FK_d9b43f03397309f709b7d0aa6a6"`);
        await queryRunner.query(`DROP TABLE "transportes"`);
        await queryRunner.query(`DROP TABLE "tipo_transportes"`);
    }

}
