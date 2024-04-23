import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTodoTable1713780388612 implements MigrationInterface {
    name = 'AlterTodoTable1713780388612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "todo" ADD "dueDate" bigint`);
        await queryRunner.query(`ALTER TABLE "todo" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "todo" ALTER COLUMN "createdAt" SET DEFAULT '1713780395033'`);
        await queryRunner.query(`ALTER TABLE "todo" ALTER COLUMN "updatedAt" SET DEFAULT '1713780395033'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT '1713780395036'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updatedAt" SET DEFAULT '1713780395036'`);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_1e982e43f63a98ad9918a86035c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_1e982e43f63a98ad9918a86035c"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updatedAt" SET DEFAULT '1713780070123'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT '1713780070123'`);
        await queryRunner.query(`ALTER TABLE "todo" ALTER COLUMN "updatedAt" SET DEFAULT '1713780070120'`);
        await queryRunner.query(`ALTER TABLE "todo" ALTER COLUMN "createdAt" SET DEFAULT '1713780070119'`);
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "dueDate"`);
        await queryRunner.query(`ALTER TABLE "todo" ADD "date" bigint`);
    }

}
