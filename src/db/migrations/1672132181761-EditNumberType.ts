import { MigrationInterface, QueryRunner } from "typeorm";

export class EditNumberType1672132181761 implements MigrationInterface {
    name = 'EditNumberType1672132181761'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "usd"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "usd" double precision NOT NULL DEFAULT '100000'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "usdt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "usdt" double precision NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "coins" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "coins" ADD "amount" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coins" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "coins" ADD "amount" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "usdt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "usdt" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "usd"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "usd" integer NOT NULL DEFAULT '100000'`);
    }

}
