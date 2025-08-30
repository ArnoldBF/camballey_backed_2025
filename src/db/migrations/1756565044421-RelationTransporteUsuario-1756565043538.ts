import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationTransporteUsuario17565650435381756565044421 implements MigrationInterface {
    name = 'RelationTransporteUsuario17565650435381756565044421'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transportes" ADD "usuario_id" integer`);
        await queryRunner.query(`ALTER TABLE "transportes" ADD CONSTRAINT "UQ_ae0052a96f97cc9e21f89830802" UNIQUE ("usuario_id")`);
        await queryRunner.query(`ALTER TABLE "transportes" ADD CONSTRAINT "UQ_77118a609a2372176f53bb112a6" UNIQUE ("interno")`);
        await queryRunner.query(`ALTER TABLE "transportes" ADD CONSTRAINT "FK_ae0052a96f97cc9e21f89830802" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transportes" DROP CONSTRAINT "FK_ae0052a96f97cc9e21f89830802"`);
        await queryRunner.query(`ALTER TABLE "transportes" DROP CONSTRAINT "UQ_77118a609a2372176f53bb112a6"`);
        await queryRunner.query(`ALTER TABLE "transportes" DROP CONSTRAINT "UQ_ae0052a96f97cc9e21f89830802"`);
        await queryRunner.query(`ALTER TABLE "transportes" DROP COLUMN "usuario_id"`);
    }

}
