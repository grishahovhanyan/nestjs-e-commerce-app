import { MigrationInterface, QueryRunner } from 'typeorm'

export class Test1712920423202 implements MigrationInterface {
  name = 'Test1712920423202'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "basket_products" ALTER COLUMN "details" SET DEFAULT '[]'`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "basket_products" ALTER COLUMN "details" SET DEFAULT '{}'`)
  }
}
