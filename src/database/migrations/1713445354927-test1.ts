import { MigrationInterface, QueryRunner } from "typeorm";

export class Test11713445354927 implements MigrationInterface {
    name = 'Test11713445354927'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order_products" ("id" SERIAL NOT NULL, "orderId" integer NOT NULL, "productId" integer NOT NULL, "details" jsonb NOT NULL DEFAULT '[]', CONSTRAINT "PK_3e59f094c2dc3310d585216a813" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "paymentMethod" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "totalPrice" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "order_products" ADD CONSTRAINT "FK_28b66449cf7cd76444378ad4e92" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_products" ADD CONSTRAINT "FK_27ca18f2453639a1cafb7404ece" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_products" DROP CONSTRAINT "FK_27ca18f2453639a1cafb7404ece"`);
        await queryRunner.query(`ALTER TABLE "order_products" DROP CONSTRAINT "FK_28b66449cf7cd76444378ad4e92"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "totalPrice"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "paymentMethod"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "address"`);
        await queryRunner.query(`DROP TABLE "order_products"`);
    }

}
