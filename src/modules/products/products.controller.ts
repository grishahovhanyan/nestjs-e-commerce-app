import { Controller, Get, Post, Query, Body, Param, Put, Delete } from '@nestjs/common'
import { SWAGGER_TAGS, SwaggerPrivateRoute, SwaggerProducts } from '@app/swagger'

import {
  RequestUser,
  ForbiddenException,
  NotFoundException,
  PAGE_SIZE_TYPES,
  getPageSize,
  paginatedResponse,
  PRODUCTS_SORT_FIELDS,
  getSortOrderFromQuery,
  SUCCESS_RESPONSE
} from '@app/common'
import { GetProductsDto, CreateProductDto, UpdateProductDto } from './dto/products.dto'

import { ProductsService } from './products.service'

@SwaggerPrivateRoute(SWAGGER_TAGS.Products)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @SwaggerProducts.index()
  @Get()
  async index(@RequestUser('id') currentUserId: number, @Query() query: GetProductsDto) {
    const page = +query.page || 1
    const perPage = getPageSize(PAGE_SIZE_TYPES.products, +query.perPage)
    const order = getSortOrderFromQuery(query.ordering?.split(',') ?? [], PRODUCTS_SORT_FIELDS)

    const getAndCountInput = {
      page,
      perPage,
      order,
      userId: currentUserId,
      category: query.category
    }

    const { items, totalCount } = await this.productsService.getAndCount(getAndCountInput)

    return paginatedResponse(totalCount, page, perPage, items)
  }

  @SwaggerProducts.create()
  @Post()
  async create(@RequestUser('id') currentUserId: number, @Body() createProductDto: CreateProductDto) {
    const product = await this.productsService.create({ createdBy: currentUserId, ...createProductDto })

    return product
  }

  @SwaggerProducts.find()
  @Get(':id')
  async find(@Param('id') productId: number) {
    const product = await this.productsService.getById(productId)

    if (!product) {
      throw new NotFoundException()
    }

    return product
  }

  @SwaggerProducts.update()
  @Put(':id')
  async update(
    @RequestUser('id') currentUserId: number,
    @Param('id') productId: number,
    @Body() updateProductDto: UpdateProductDto
  ) {
    const product = await this.productsService.getById(productId)

    if (!product) {
      throw new NotFoundException()
    }
    if (product.createdBy !== currentUserId) {
      throw new ForbiddenException()
    }

    const updatedProduct = await this.productsService.updateById(productId, updateProductDto)

    return updatedProduct
  }

  @SwaggerProducts.delete()
  @Delete(':id')
  async delete(@RequestUser('id') currentUserId: number, @Param('id') productId: number) {
    const product = await this.productsService.getById(productId)

    if (!product) {
      throw new NotFoundException()
    }

    if (product.createdBy !== currentUserId) {
      throw new ForbiddenException()
    }

    await this.productsService.deleteById(productId)

    return SUCCESS_RESPONSE
  }
}
