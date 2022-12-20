import { MigrationInterface, QueryRunner } from "typeorm";

export class generate1671499437671 implements MigrationInterface {
    name = 'generate1671499437671'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "firebaseId" character varying NOT NULL, "name" character varying NOT NULL, "avatar" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_1c2d0bf809fd5f537a43d8f8d8e" UNIQUE ("firebaseId"), CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("messageId" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userUserId" uuid, CONSTRAINT "PK_9743b3cec687ac55895f0d79ae0" PRIMARY KEY ("messageId"))`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_0dc4e829a9c6d5d9004a0946ad9" FOREIGN KEY ("userUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_0dc4e829a9c6d5d9004a0946ad9"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
