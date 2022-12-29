import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeCoinName1672141108138 implements MigrationInterface {
    name = 'ChangeCoinName1672141108138'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user-coin" ("coinId" uuid NOT NULL, "name" character varying NOT NULL, "symbol" character varying NOT NULL, "avatar" character varying NOT NULL, "amount" double precision NOT NULL, "priceAtPurchase" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userUserId" uuid, CONSTRAINT "PK_c3a5ab27f2435019f34fff4b623" PRIMARY KEY ("coinId"))`);
        await queryRunner.query(`ALTER TABLE "user-coin" ADD CONSTRAINT "FK_6b771cd6203e68a08a525a35143" FOREIGN KEY ("userUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user-coin" DROP CONSTRAINT "FK_6b771cd6203e68a08a525a35143"`);
        await queryRunner.query(`DROP TABLE "user-coin"`);
    }

}
