import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import { DataSource } from 'typeorm'

import { BaseRepository } from '@common/base.repository'
import { BasketProduct } from '@entities/basket-product.entity'

@Injectable()
export class BasketProductsRepository extends BaseRepository<BasketProduct> {
  constructor(dataSource: DataSource, @Inject(REQUEST) req: Request) {
    super(dataSource, req, BasketProduct)
  }
}
