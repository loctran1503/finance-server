import { MigrationInterface, QueryRunner } from "typeorm";

export class generatingDatabase1670603818631 implements MigrationInterface {
    name = 'generatingDatabase1670603818631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "firebaseId" character varying NOT NULL, "name" character varying NOT NULL, "avatar" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_4d8f69fd9538c19d3a42518feac" UNIQUE ("firebaseId"), CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
