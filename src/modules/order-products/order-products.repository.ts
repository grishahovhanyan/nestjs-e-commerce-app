import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import { DataSource } from 'typeorm'

import { BaseRepository } from '@common/base.repository'
import { OrderProduct } from '@entities/order-product.entity'

@Injectable()
export class OrderProductsRepository extends BaseRepository<OrderProduct> {
  constructor(dataSource: DataSource, @Inject(REQUEST) req: Request) {
    super(dataSource, req, OrderProduct)
  }

  async bulkCreate(bulkCreateInput: Partial<OrderProduct>[]) {
    const items = this.getRepository().create(bulkCreateInput)
    return await this.getRepository().save(items)
  }
}
