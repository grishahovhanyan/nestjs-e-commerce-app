import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'

import { OrderProduct, BaseRepository } from '@app/database'

@Injectable()
export class OrderProductsRepository extends BaseRepository<OrderProduct> {
  constructor(dataSource: DataSource) {
    super(dataSource, OrderProduct)
  }

  async bulkCreate(bulkCreateInput: Partial<OrderProduct>[]) {
    const items = this.getRepository().create(bulkCreateInput)
    return await this.getRepository().save(items)
  }
}
