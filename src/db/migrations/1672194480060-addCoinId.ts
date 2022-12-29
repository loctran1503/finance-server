import { MigrationInterface, QueryRunner } from "typeorm";

export class addCoinId1672194480060 implements MigrationInterface {
    name = 'addCoinId1672194480060'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user-coin" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user-coin" DROP CONSTRAINT "PK_c3a5ab27f2435019f34fff4b623"`);
        await queryRunner.query(`ALTER TABLE "user-coin" ADD CONSTRAINT "PK_3ee3738256a28707b43392953fa" PRIMARY KEY ("coinId", "id")`);
        await queryRunner.query(`ALTER TABLE "user-coin" DROP CONSTRAINT "PK_3ee3738256a28707b43392953fa"`);
        await queryRunner.query(`ALTER TABLE "user-coin" ADD CONSTRAINT "PK_f2d47315d2dd4d903508c7a1c4a" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user-coin" DROP COLUMN "coinId"`);
        await queryRunner.query(`ALTER TABLE "user-coin" ADD "coinId" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user-coin" DROP COLUMN "coinId"`);
        await queryRunner.query(`ALTER TABLE "user-coin" ADD "coinId" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user-coin" DROP CONSTRAINT "PK_f2d47315d2dd4d903508c7a1c4a"`);
        await queryRunner.query(`ALTER TABLE "user-coin" ADD CONSTRAINT "PK_3ee3738256a28707b43392953fa" PRIMARY KEY ("coinId", "id")`);
        await queryRunner.query(`ALTER TABLE "user-coin" DROP CONSTRAINT "PK_3ee3738256a28707b43392953fa"`);
        await queryRunner.query(`ALTER TABLE "user-coin" ADD CONSTRAINT "PK_c3a5ab27f2435019f34fff4b623" PRIMARY KEY ("coinId")`);
        await queryRunner.query(`ALTER TABLE "user-coin" DROP COLUMN "id"`);
    }

}
