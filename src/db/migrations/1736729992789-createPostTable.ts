import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePostTable1736729992789 implements MigrationInterface {
  name = 'CreatePostTable1736729992789';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "url" character varying, "text" text NOT NULL, "published" TIMESTAMP, "author" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e28aa0c4114146bfb1567bfa9a" ON "post" ("title") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e28aa0c4114146bfb1567bfa9a"`,
    );
    await queryRunner.query(`DROP TABLE "post"`);
  }
}
