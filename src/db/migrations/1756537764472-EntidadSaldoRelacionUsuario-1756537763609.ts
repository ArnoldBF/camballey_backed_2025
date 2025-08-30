import { MigrationInterface, QueryRunner } from "typeorm";

export class EntidadSaldoRelacionUsuario17565377636091756537764472 implements MigrationInterface {
    name = 'EntidadSaldoRelacionUsuario17565377636091756537764472'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "saldos" ("id" SERIAL NOT NULL, "monto" numeric NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "usuario_id" integer, CONSTRAINT "REL_b955fd3aaf7bb9500247530f4c" UNIQUE ("usuario_id"), CONSTRAINT "PK_a8878506d98a58cf1ac9b6d3ee2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "saldos" ADD CONSTRAINT "FK_b955fd3aaf7bb9500247530f4c6" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "saldos" DROP CONSTRAINT "FK_b955fd3aaf7bb9500247530f4c6"`);
        await queryRunner.query(`DROP TABLE "saldos"`);
    }

}
