import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTables1721143662339 implements MigrationInterface {
  name = 'CreateTables1721143662339'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "products" ("id" SERIAL NOT NULL, "createdBy" integer NOT NULL, "name" character varying NOT NULL, "category" character varying NOT NULL, "price" integer NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "order_products" ("id" SERIAL NOT NULL, "orderId" integer NOT NULL, "productId" integer NOT NULL, "details" jsonb NOT NULL DEFAULT '[]', CONSTRAINT "PK_3e59f094c2dc3310d585216a813" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "address" character varying NOT NULL, "paymentMethod" character varying NOT NULL, "totalPrice" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying, "lastName" character varying, "email" character varying, "password" character varying NOT NULL, "registeredAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "baskets" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, CONSTRAINT "REL_f969c8e32db5999a8f45ed33ab" UNIQUE ("userId"), CONSTRAINT "PK_5ebda63f14b0171d7468bc32175" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "basket_products" ("id" SERIAL NOT NULL, "basketId" integer NOT NULL, "productId" integer NOT NULL, "details" jsonb NOT NULL DEFAULT '[]', CONSTRAINT "PK_b6245f9f34546a14637d4deb7e6" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_f74bae41998e06cc579f081ea78" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "order_products" ADD CONSTRAINT "FK_28b66449cf7cd76444378ad4e92" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "order_products" ADD CONSTRAINT "FK_27ca18f2453639a1cafb7404ece" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "baskets" ADD CONSTRAINT "FK_f969c8e32db5999a8f45ed33aba" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "basket_products" ADD CONSTRAINT "FK_5e913ec216ed0cde0d99c8bbaec" FOREIGN KEY ("basketId") REFERENCES "baskets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "basket_products" ADD CONSTRAINT "FK_a77982d01e0a8774ebf4a4857ec" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "basket_products" DROP CONSTRAINT "FK_a77982d01e0a8774ebf4a4857ec"`)
    await queryRunner.query(`ALTER TABLE "basket_products" DROP CONSTRAINT "FK_5e913ec216ed0cde0d99c8bbaec"`)
    await queryRunner.query(`ALTER TABLE "baskets" DROP CONSTRAINT "FK_f969c8e32db5999a8f45ed33aba"`)
    await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`)
    await queryRunner.query(`ALTER TABLE "order_products" DROP CONSTRAINT "FK_27ca18f2453639a1cafb7404ece"`)
    await queryRunner.query(`ALTER TABLE "order_products" DROP CONSTRAINT "FK_28b66449cf7cd76444378ad4e92"`)
    await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_f74bae41998e06cc579f081ea78"`)
    await queryRunner.query(`DROP TABLE "basket_products"`)
    await queryRunner.query(`DROP TABLE "baskets"`)
    await queryRunner.query(`DROP TABLE "users"`)
    await queryRunner.query(`DROP TABLE "orders"`)
    await queryRunner.query(`DROP TABLE "order_products"`)
    await queryRunner.query(`DROP TABLE "products"`)
  }
}
