import { MigrationInterface, QueryRunner } from "typeorm";

export class insertMessageEntity1671244438515 implements MigrationInterface {
    name = 'insertMessageEntity1671244438515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "message" ("messageId" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "userUserId" uuid, CONSTRAINT "PK_b664c8ae63d634326ce5896cecc" PRIMARY KEY ("messageId"))`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_0a02be6a16967b5028d83310a72" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_0a02be6a16967b5028d83310a72"`);
        await queryRunner.query(`DROP TABLE "message"`);
    }

}
