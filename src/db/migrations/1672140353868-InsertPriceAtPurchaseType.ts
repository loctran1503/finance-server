import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertPriceAtPurchaseType1672140353868 implements MigrationInterface {
    name = 'InsertPriceAtPurchaseType1672140353868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coins" ADD "priceAtPurchase" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coins" DROP COLUMN "priceAtPurchase"`);
    }

}
