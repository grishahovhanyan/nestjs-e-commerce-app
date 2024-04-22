import { Module } from '@nestjs/common'

import { OrderProductsRepository } from './order-products.repository'
import { OrderProductsService } from './order-products.service'

@Module({
  providers: [OrderProductsService, OrderProductsRepository],
  exports: [OrderProductsService]
})
export class OrderProductsModule {}
