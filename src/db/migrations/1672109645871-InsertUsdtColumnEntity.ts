import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertUsdtColumnEntity1672109645871 implements MigrationInterface {
    name = 'InsertUsdtColumnEntity1672109645871'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "usdt" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "usdt"`);
    }

}
