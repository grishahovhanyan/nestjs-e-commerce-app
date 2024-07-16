import { Module } from '@nestjs/common'

import { OrdersController } from './orders.controller'
import { OrdersService } from './orders.service'
import { OrdersRepository } from './orders.repository'

import { OrderProductsModule } from '@modules/order-products/order-products.module'

@Module({
  imports: [OrderProductsModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
  exports: [OrdersService]
})
export class OrdersModule {}
