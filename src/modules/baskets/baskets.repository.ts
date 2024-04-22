import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import { DataSource } from 'typeorm'

import { BaseRepository } from '@common/base.repository'
import { Basket } from '@entities/basket.entity'

@Injectable()
export class BasketsRepository extends BaseRepository<Basket> {
  constructor(dataSource: DataSource, @Inject(REQUEST) req: Request) {
    super(dataSource, req, Basket)
  }
}
