import { Injectable } from '@nestjs/common'
import { NotFound } from '@exceptions/index'

import { ICreateBasketProductInput } from '@interfaces/basket-product.interface'
import { AddProductDto, RemoveProductDto } from '@dto/basket.dto'
import { BasketProductsRepository } from './basket-products.repository'

import { BasketProduct } from '@entities/basket-product.entity'

@Injectable()
export class BasketProductsService {
  constructor(private readonly basketProductsRepository: BasketProductsRepository) {}

  async addProduct(basketId: number, addProductInput: AddProductDto): Promise<BasketProduct> {
    let record = await this.getByBasketIdAndProductId(basketId, addProductInput.productId)

    const newDetail = {
      color: addProductInput.color,
      quantity: addProductInput.quantity
    }

    if (record) {
      // Product already added to basket
      let isProductExists = false

      for (let i = 0; i < record.details.length; i++) {
        const detail = record.details[i]

        if (detail.color === addProductInput.color) {
          isProductExists = true
          detail.quantity += addProductInput.quantity
          break
        }
      }

      if (isProductExists) {
        // Update product quantity
        await this.update(record.id, { details: record.details })
      } else {
        // Add new detail with new color
        await this.update(record.id, { details: [...record.details, newDetail] })
      }
    } else {
      // Product is not exist in basket
      record = await this.create({
        basketId,
        productId: addProductInput.productId,
        details: [newDetail]
      })
    }

    return record
  }

  async removeProduct(basketId: number, removeProductInput: RemoveProductDto): Promise<BasketProduct> {
    const record = await this.getByBasketIdAndProductId(basketId, removeProductInput.productId)

    if (!record) {
      throw new NotFound()
    }

    let isProductExists = false

    for (let i = 0; i < record.details.length; i++) {
      const detail = record.details[i]

      if (detail.color === removeProductInput.color) {
        isProductExists = true
        detail.quantity -= removeProductInput.quantity

        if (detail.quantity <= 0) {
          record.details.splice(i, 1)
        }

        break
      }
    }

    if (!isProductExists) {
      throw new NotFound()
    }

    await this.update(record.id, { details: record.details })

    return record
  }

  async getByBasketIdAndProductId(basketId: number, productId: number): Promise<BasketProduct> {
    return await this.basketProductsRepository.findOne({ basketId, productId })
  }

  async create(createBasketProductInput: ICreateBasketProductInput): Promise<BasketProduct> {
    return await this.basketProductsRepository.create(createBasketProductInput)
  }

  async update(id: number, updateBasketProductInput: Partial<BasketProduct>) {
    return await this.basketProductsRepository.update({ id }, updateBasketProductInput)
  }

  async bulkDeleteByBasketId(basketId: number) {
    return await this.basketProductsRepository.delete({ basketId })
  }
}
