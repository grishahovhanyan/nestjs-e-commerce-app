import { Module } from '@nestjs/common'

import { BasketsController } from './baskets.controller'
import { BasketsService } from './baskets.service'
import { BasketsRepository } from './baskets.repository'

import { ProductsModule } from '@modules/products/products.module'
import { BasketProductsModule } from '@modules/basket-products/basket-products.module'
import { OrdersModule } from '@modules/orders/orders.module'

@Module({
  imports: [ProductsModule, BasketProductsModule, OrdersModule],
  controllers: [BasketsController],
  providers: [BasketsService, BasketsRepository],
  exports: [BasketsService]
})
export class BasketsModule {}
