import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'

import { Basket, BaseRepository } from '@app/database'

@Injectable()
export class BasketsRepository extends BaseRepository<Basket> {
  constructor(dataSource: DataSource) {
    super(dataSource, Basket)
  }
}
