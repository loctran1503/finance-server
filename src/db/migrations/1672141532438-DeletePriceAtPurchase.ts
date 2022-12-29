import { MigrationInterface, QueryRunner } from "typeorm";

export class DeletePriceAtPurchase1672141532438 implements MigrationInterface {
    name = 'DeletePriceAtPurchase1672141532438'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user-coin" DROP COLUMN "priceAtPurchase"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user-coin" ADD "priceAtPurchase" double precision NOT NULL`);
    }

}
