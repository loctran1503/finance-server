import { MigrationInterface, QueryRunner } from "typeorm";

export class DeletePassword1669771104771 implements MigrationInterface {
    name = 'DeletePassword1669771104771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
    }

}
