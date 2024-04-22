import { MigrationInterface, QueryRunner } from 'typeorm'

export class Test1712920232441 implements MigrationInterface {
  name = 'Test1712920232441'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "basket_products" DROP CONSTRAINT "FK_5e913ec216ed0cde0d99c8bbaec"`)
    await queryRunner.query(`ALTER TABLE "basket_products" DROP CONSTRAINT "REL_5e913ec216ed0cde0d99c8bbae"`)
    await queryRunner.query(
      `ALTER TABLE "basket_products" ADD CONSTRAINT "FK_5e913ec216ed0cde0d99c8bbaec" FOREIGN KEY ("basketId") REFERENCES "baskets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "basket_products" DROP CONSTRAINT "FK_5e913ec216ed0cde0d99c8bbaec"`)
    await queryRunner.query(
      `ALTER TABLE "basket_products" ADD CONSTRAINT "REL_5e913ec216ed0cde0d99c8bbae" UNIQUE ("basketId")`
    )
    await queryRunner.query(
      `ALTER TABLE "basket_products" ADD CONSTRAINT "FK_5e913ec216ed0cde0d99c8bbaec" FOREIGN KEY ("basketId") REFERENCES "baskets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }
}
