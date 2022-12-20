import { MigrationInterface, QueryRunner } from "typeorm";

export class EditMessageCreatedAt1671347510919 implements MigrationInterface {
    name = 'EditMessageCreatedAt1671347510919'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "timestamp"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "timestamp"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "timestamp" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
