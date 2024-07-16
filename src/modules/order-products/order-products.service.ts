import { Injectable } from '@nestjs/common'

import { OrderProduct } from '@app/database'
import { OrderProductsRepository } from './order-products.repository'

@Injectable()
export class OrderProductsService {
  constructor(private readonly basketProductsRepository: OrderProductsRepository) {}

  async create(createOrderProductInput: Partial<OrderProduct>): Promise<OrderProduct> {
    return await this.basketProductsRepository.create(createOrderProductInput)
  }

  async bulkCreate(createOrderProductsInput: Partial<OrderProduct>[]): Promise<OrderProduct[]> {
    return await this.basketProductsRepository.bulkCreate(createOrderProductsInput)
  }
}
