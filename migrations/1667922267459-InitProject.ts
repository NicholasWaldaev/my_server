import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitProject1667922267459 implements MigrationInterface {
  name = 'InitProject1667922267459';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "address" ("id" SERIAL NOT NULL, "street" character varying NOT NULL, "city" character varying NOT NULL, "country" character varying NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "database_file" ("id" SERIAL NOT NULL, "filename" character varying NOT NULL, "data" bytea NOT NULL, CONSTRAINT "PK_6a48e4fea10786b44d274ba8175" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_permissions_enum" AS ENUM('DeletePost', 'CreateCategory')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('User', 'Admin')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "isTwoFactorAuthenticationEnabled" boolean NOT NULL DEFAULT false, "twoFactorAuthenticationSecret" character varying, "email" character varying NOT NULL, "isEmailConfirmed" boolean NOT NULL DEFAULT false, "phoneNumber" character varying, "isPhoneNumberConfirmed" boolean NOT NULL DEFAULT false, "currentHashedRefreshToken" character varying, "name" character varying NOT NULL, "avatarId" integer, "password" character varying, "isRegisteredWithGoogle" boolean NOT NULL DEFAULT false, "permissions" "public"."user_permissions_enum" array NOT NULL DEFAULT '{}', "role" "public"."user_role_enum" NOT NULL DEFAULT 'User', "addressId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_58f5c71eaab331645112cf8cfa" UNIQUE ("avatarId"), CONSTRAINT "REL_217ba147c5de6c107f2fa7fa27" UNIQUE ("addressId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "deletedAt" TIMESTAMP, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "comment" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "postId" integer, "authorId" integer, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "post" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "scheduledDate" TIMESTAMP, "title" character varying NOT NULL, "content" character varying NOT NULL, "paragraphs" text array, "authorId" integer, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "post_categories_category" ("postId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_91306c0021c4901c1825ef097ce" PRIMARY KEY ("postId", "categoryId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_93b566d522b73cb8bc46f7405b" ON "post_categories_category" ("postId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a5e63f80ca58e7296d5864bd2d" ON "post_categories_category" ("categoryId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_58f5c71eaab331645112cf8cfa5" FOREIGN KEY ("avatarId") REFERENCES "database_file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_94a85bb16d24033a2afdd5df060" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_276779da446413a0d79598d4fbd" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_categories_category" ADD CONSTRAINT "FK_93b566d522b73cb8bc46f7405bd" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_categories_category" ADD CONSTRAINT "FK_a5e63f80ca58e7296d5864bd2d3" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post_categories_category" DROP CONSTRAINT "FK_a5e63f80ca58e7296d5864bd2d3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_categories_category" DROP CONSTRAINT "FK_93b566d522b73cb8bc46f7405bd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_276779da446413a0d79598d4fbd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_94a85bb16d24033a2afdd5df060"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_58f5c71eaab331645112cf8cfa5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a5e63f80ca58e7296d5864bd2d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_93b566d522b73cb8bc46f7405b"`,
    );
    await queryRunner.query(`DROP TABLE "post_categories_category"`);
    await queryRunner.query(`DROP TABLE "post"`);
    await queryRunner.query(`DROP TABLE "comment"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    await queryRunner.query(`DROP TYPE "public"."user_permissions_enum"`);
    await queryRunner.query(`DROP TABLE "database_file"`);
    await queryRunner.query(`DROP TABLE "address"`);
  }
}
