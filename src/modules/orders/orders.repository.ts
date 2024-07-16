import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'

import { Order, BaseRepository } from '@app/database'

@Injectable()
export class OrdersRepository extends BaseRepository<Order> {
  constructor(dataSource: DataSource) {
    super(dataSource, Order)
  }
}
