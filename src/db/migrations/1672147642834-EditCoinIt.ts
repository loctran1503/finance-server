import { MigrationInterface, QueryRunner } from "typeorm";

export class EditCoinIt1672147642834 implements MigrationInterface {
    name = 'EditCoinIt1672147642834'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user-coin" ALTER COLUMN "coinId" SET DEFAULT uuid_generate_v4()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user-coin" ALTER COLUMN "coinId" DROP DEFAULT`);
    }

}
