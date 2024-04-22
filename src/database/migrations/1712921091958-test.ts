import { MigrationInterface, QueryRunner } from 'typeorm'

export class Test1712921091958 implements MigrationInterface {
  name = 'Test1712921091958'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "basket_products" DROP COLUMN "quantity"`)
    await queryRunner.query(`ALTER TABLE "basket_products" DROP COLUMN "color"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "basket_products" ADD "color" character varying NOT NULL`)
    await queryRunner.query(`ALTER TABLE "basket_products" ADD "quantity" integer NOT NULL`)
  }
}
