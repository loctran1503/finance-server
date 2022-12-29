import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertCoinEntity1672105126617 implements MigrationInterface {
    name = 'InsertCoinEntity1672105126617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "coins" ("coinId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "symbol" character varying NOT NULL, "avatar" character varying NOT NULL, "amount" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userUserId" uuid, CONSTRAINT "PK_6f9cd369c68a7f912ded9553a12" PRIMARY KEY ("coinId"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "usd" integer NOT NULL DEFAULT '100000'`);
        await queryRunner.query(`ALTER TABLE "coins" ADD CONSTRAINT "FK_327d1cafd2c9a1a41d6d5579008" FOREIGN KEY ("userUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coins" DROP CONSTRAINT "FK_327d1cafd2c9a1a41d6d5579008"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "usd"`);
        await queryRunner.query(`DROP TABLE "coins"`);
    }

}
