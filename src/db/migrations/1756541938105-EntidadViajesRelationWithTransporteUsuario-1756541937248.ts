import { MigrationInterface, QueryRunner } from "typeorm";

export class EntidadViajesRelationWithTransporteUsuario17565419372481756541938105 implements MigrationInterface {
    name = 'EntidadViajesRelationWithTransporteUsuario17565419372481756541938105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "viajes" ("id" SERIAL NOT NULL, "monto" numeric NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "usuario_id" integer, "transporte_id" integer, CONSTRAINT "PK_494f8b59dff1674f6b4efbcea2a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "viajes" ADD CONSTRAINT "FK_a50efb54c9f31a7921feae76bd4" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "viajes" ADD CONSTRAINT "FK_afeca0724782904e6e25ee9f579" FOREIGN KEY ("transporte_id") REFERENCES "transportes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "viajes" DROP CONSTRAINT "FK_afeca0724782904e6e25ee9f579"`);
        await queryRunner.query(`ALTER TABLE "viajes" DROP CONSTRAINT "FK_a50efb54c9f31a7921feae76bd4"`);
        await queryRunner.query(`DROP TABLE "viajes"`);
    }

}
