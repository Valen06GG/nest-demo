import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAdmin1771334775150 implements MigrationInterface {
    name = 'AddAdmin1771334775150'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD COLUMN "isAdmin" boolean NOT NULL DEFAULT false
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            DROP COLUMN "isAdmin"
        `);
    }
}