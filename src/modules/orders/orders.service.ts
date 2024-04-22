import { Injectable } from '@nestjs/common'

import { IGetOrdersInput, ICreateOrderInput } from '@interfaces/order.interface'
import { DB_RELATIONS } from '@database/constants'
import { OrdersRepository } from './orders.repository'
import { OrderProductsService } from '@modules/order-products/order-products.service'
import { IFindAndCountInput } from '@interfaces/db.interface'

import { OrderProduct } from '@entities/order-product.entity'
import { Order } from '@entities/order.entity'
import { LessThanOrEqual, MoreThanOrEqual } from 'typeorm'

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly orderProductsService: OrderProductsService
  ) {}

  async create(createOrderInput: ICreateOrderInput): Promise<Order> {
    let totalPrice = 0
    const createOrderProductsInput: Partial<OrderProduct>[] = []

    // Prepare createOrderProductsInput and calculate totalPrice
    for (const basketItem of createOrderInput.basketItems) {
      createOrderProductsInput.push({
        productId: basketItem.productId,
        details: basketItem.details.map((detailItem) => {
          totalPrice += detailItem.quantity * basketItem.product.price

          return {
            ...detailItem,
            price: basketItem.product.price
          }
        })
      })
    }

    // Create order
    const order = await this.ordersRepository.create({
      userId: createOrderInput.userId,
      address: createOrderInput.address,
      paymentMethod: createOrderInput.paymentMethod,
      totalPrice
    })

    // Add orderId to order products
    createOrderProductsInput.forEach((orderProduct) => (orderProduct.orderId = order.id))

    // Create order products
    await this.orderProductsService.bulkCreate(createOrderProductsInput)

    return order
  }

  async getAndCount(getOrdersInput: IGetOrdersInput) {
    const { page, perPage, order, userId, createdAtGte, createdAtLte } = getOrdersInput

    const findAndCountInput: IFindAndCountInput<Order> = {
      conditions: {
        userId,
        ...(createdAtGte ? { createdAt: MoreThanOrEqual(new Date(createdAtGte)) } : {}),
        ...(createdAtLte ? { createdAt: LessThanOrEqual(new Date(createdAtLte)) } : {})
      },
      relations: [DB_RELATIONS.user, DB_RELATIONS.items, DB_RELATIONS.itemsProduct],
      take: perPage,
      skip: (page - 1) * perPage,
      order
    }
    return await this.ordersRepository.findAndCount(findAndCountInput)
  }
}
