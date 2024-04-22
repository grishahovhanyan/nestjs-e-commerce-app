import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import { DataSource } from 'typeorm'

import { BaseRepository } from '@common/base.repository'
import { Order } from '@entities/order.entity'

@Injectable()
export class OrdersRepository extends BaseRepository<Order> {
  constructor(dataSource: DataSource, @Inject(REQUEST) req: Request) {
    super(dataSource, req, Order)
  }
}
