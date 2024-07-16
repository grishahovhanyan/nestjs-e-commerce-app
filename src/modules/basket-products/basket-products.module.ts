import { Module } from '@nestjs/common'

import { BasketProductsRepository } from './basket-products.repository'
import { BasketProductsService } from './basket-products.service'

@Module({
  providers: [BasketProductsService, BasketProductsRepository],
  exports: [BasketProductsService]
})
export class BasketProductsModule {}
