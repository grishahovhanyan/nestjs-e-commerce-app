import { Injectable } from '@nestjs/common'
import { In } from 'typeorm'

import { Product, DB_RELATIONS, IFindAndCountInput } from '@app/database'
import { GetProductsDto, CreateProductDto } from './dto/products.dto'
import { ProductsRepository } from './products.repository'

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async create(createProductInput: CreateProductDto): Promise<Product> {
    return await this.productsRepository.create(createProductInput)
  }

  async getAndCount(getProductsInput: GetProductsDto) {
    const { page, perPage, order, userId, category } = getProductsInput

    const findAndCountInput: IFindAndCountInput<Product> = {
      conditions: {
        createdBy: userId,
        ...(category ? { category } : {})
      },
      relations: [DB_RELATIONS.creator],
      take: perPage,
      skip: (page - 1) * perPage,
      order
    }
    return await this.productsRepository.findAndCount(findAndCountInput)
  }

  async getById(productId: number): Promise<Product | null> {
    return await this.productsRepository.findOne({ id: productId }, { relations: [DB_RELATIONS.creator] })
  }

  async getByIds(productIds: number[]): Promise<Product[]> {
    return await this.productsRepository.find({ id: In(productIds) })
  }

  async updateById(productId: number, updateProductInput: Partial<Product>): Promise<Product | null> {
    await this.productsRepository.update({ id: productId }, updateProductInput)
    return await this.getById(productId)
  }

  async deleteById(productId: number) {
    await this.productsRepository.delete({ id: productId })
  }
}
