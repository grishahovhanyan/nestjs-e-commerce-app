import { Injectable } from '@nestjs/common'

import { OrderProductsRepository } from './order-products.repository'

import { OrderProduct } from '@entities/order-product.entity'

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
