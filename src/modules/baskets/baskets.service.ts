import { Injectable } from '@nestjs/common'

import { Basket, DB_RELATIONS } from '@app/database'
import { BasketsRepository } from './baskets.repository'
import { BasketProductsService } from '@modules/basket-products/basket-products.service'

@Injectable()
export class BasketsService {
  constructor(
    private readonly basketsRepository: BasketsRepository,
    private readonly basketProductsService: BasketProductsService
  ) {}

  async create(createBasketInput: { userId: number }): Promise<Basket> {
    return await this.basketsRepository.create(createBasketInput)
  }

  async getByUserId(userId: number): Promise<Basket | null> {
    return await this.basketsRepository.findOne(
      { userId },
      { relations: [DB_RELATIONS.user, DB_RELATIONS.items, DB_RELATIONS.itemsProduct] }
    )
  }

  async emptyById(basketId: number) {
    return await this.basketProductsService.bulkDeleteByBasketId(basketId)
  }
}
