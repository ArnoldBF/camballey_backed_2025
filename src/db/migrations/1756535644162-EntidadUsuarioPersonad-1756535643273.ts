import { MigrationInterface, QueryRunner } from "typeorm";

export class EntidadUsuarioPersonad17565356432731756535644162 implements MigrationInterface {
    name = 'EntidadUsuarioPersonad17565356432731756535644162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" SERIAL NOT NULL, "userName" character varying(150) NOT NULL, "password" character varying(150) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "persona_id" integer, CONSTRAINT "REL_899199fd151861c079720cc508" UNIQUE ("persona_id"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "FK_899199fd151861c079720cc508f" FOREIGN KEY ("persona_id") REFERENCES "personas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "FK_899199fd151861c079720cc508f"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
    }

}
