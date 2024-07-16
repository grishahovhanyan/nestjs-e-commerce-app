import { Transactional } from 'typeorm-transactional'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'

import { Order, OrderProduct } from '@app/database'
import { CreateOrderDto, GetOrdersDto } from './dto/order.dto'
import { OrdersRepository } from './orders.repository'
import { OrderProductsService } from '@modules/order-products/order-products.service'

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    @InjectRepository(Order)
    private readonly repo: Repository<Order>, // Can be used to create queryBuilder
    private readonly orderProductsService: OrderProductsService
  ) {}

  @Transactional()
  async create(createOrderInput: CreateOrderDto): Promise<Order> {
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

  async getAndCount(getOrdersInput: GetOrdersDto) {
    const { page, perPage, order, userId, createdAtGte, createdAtLte } = getOrdersInput

    const queryBuilder = this.repo
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.items', 'items')
      .leftJoinAndSelect('items.product', 'itemsProduct')
      .where('order.userId = :userId', { userId })

    if (createdAtGte) {
      queryBuilder.andWhere('order.createdAt >= :createdAtGte', { createdAtGte: new Date(createdAtGte) })
    }

    if (createdAtLte) {
      queryBuilder.andWhere('order.createdAt <= :createdAtLte', { createdAtLte: new Date(createdAtLte) })
    }

    queryBuilder.take(perPage).skip((page - 1) * perPage)

    if (order) {
      Object.entries(order).forEach(([key, value]) => {
        queryBuilder.addOrderBy(`user.${key}`, value as 'ASC' | 'DESC')
      })
    }

    const [items, totalCount] = await queryBuilder.getManyAndCount()

    return { items, totalCount }
  }
}
