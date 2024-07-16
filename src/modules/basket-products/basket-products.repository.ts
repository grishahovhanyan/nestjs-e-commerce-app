import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'

import { BasketProduct, BaseRepository } from '@app/database'

@Injectable()
export class BasketProductsRepository extends BaseRepository<BasketProduct> {
  constructor(dataSource: DataSource) {
    super(dataSource, BasketProduct)
  }
}
