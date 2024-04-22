import { MigrationInterface, QueryRunner } from 'typeorm'

export class Test1712920378082 implements MigrationInterface {
  name = 'Test1712920378082'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "basket_products" ADD "details" jsonb NOT NULL DEFAULT '{}'`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "basket_products" DROP COLUMN "details"`)
  }
}
