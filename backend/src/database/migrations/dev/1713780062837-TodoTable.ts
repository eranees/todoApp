import { MigrationInterface, QueryRunner } from "typeorm";

export class TodoTable1713780062837 implements MigrationInterface {
    name = 'TodoTable1713780062837'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "todo" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "descreption" character varying NOT NULL, "createdAt" bigint NOT NULL DEFAULT '1713780070119', "updatedAt" bigint NOT NULL DEFAULT '1713780070120', "date" bigint, "status" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT '1713780070123'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updatedAt" SET DEFAULT '1713780070123'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updatedAt" SET DEFAULT '1713779179963'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT '1713779179963'`);
        await queryRunner.query(`DROP TABLE "todo"`);
    }

}
