import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'

import { Product, BaseRepository } from '@app/database'

@Injectable()
export class ProductsRepository extends BaseRepository<Product> {
  constructor(dataSource: DataSource) {
    super(dataSource, Product)
  }
}
