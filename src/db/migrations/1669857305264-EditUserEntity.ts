import { MigrationInterface, QueryRunner } from "typeorm";

export class EditUserEntity1669857305264 implements MigrationInterface {
    name = 'EditUserEntity1669857305264'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "email" TO "firebaseId"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "firebaseId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_4d8f69fd9538c19d3a42518feac" UNIQUE ("firebaseId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_4d8f69fd9538c19d3a42518feac"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "firebaseId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "firebaseId" TO "email"`);
    }

}
