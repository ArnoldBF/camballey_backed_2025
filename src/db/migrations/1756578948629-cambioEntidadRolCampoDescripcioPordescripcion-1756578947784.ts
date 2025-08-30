import { MigrationInterface, QueryRunner } from "typeorm";

export class CambioEntidadRolCampoDescripcioPordescripcion17565789477841756578948629 implements MigrationInterface {
    name = 'CambioEntidadRolCampoDescripcioPordescripcion17565789477841756578948629'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" RENAME COLUMN "Descripcion" TO "descripcion"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" RENAME COLUMN "descripcion" TO "Descripcion"`);
    }

}
