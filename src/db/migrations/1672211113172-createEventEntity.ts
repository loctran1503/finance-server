import { MigrationInterface, QueryRunner } from "typeorm";

export class createEventEntity1672211113172 implements MigrationInterface {
    name = 'createEventEntity1672211113172'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user-event" ("eventId" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "porfolio" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userUserId" uuid, CONSTRAINT "PK_94f9999ea34a99b33ad25a6d73e" PRIMARY KEY ("eventId"))`);
        await queryRunner.query(`ALTER TABLE "user-event" ADD CONSTRAINT "FK_5a4d1d092d02a9cbc61aef6c103" FOREIGN KEY ("userUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user-event" DROP CONSTRAINT "FK_5a4d1d092d02a9cbc61aef6c103"`);
        await queryRunner.query(`DROP TABLE "user-event"`);
    }

}
