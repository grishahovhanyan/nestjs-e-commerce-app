import { Controller, Get, Post, Body, Delete, HttpCode } from '@nestjs/common'
import { SWAGGER_TAGS, SwaggerPrivateRoute, SwaggerBaskets } from '@app/swagger'

import { RequestUser, BadRequestException, NotFoundException, ERROR_MESSAGES, SUCCESS_RESPONSE } from '@app/common'
import { AddProductDto, RemoveProductDto, CheckoutBasketDto } from './dto/basket.dto'

import { BasketsService } from './baskets.service'
import { BasketProductsService } from '@modules/basket-products/basket-products.service'
import { ProductsService } from '@modules/products/products.service'
import { OrdersService } from '@modules/orders/orders.service'

@SwaggerPrivateRoute(SWAGGER_TAGS.Baskets)
@Controller('baskets')
export class BasketsController {
  constructor(
    private readonly basketsService: BasketsService,
    private readonly basketProductsService: BasketProductsService,
    private readonly productsService: ProductsService,
    private readonly ordersService: OrdersService
  ) {}

  @SwaggerBaskets.index()
  @Get('my')
  async index(@RequestUser('id') currentUserId: number) {
    const basket = await this.basketsService.getByUserId(currentUserId)
    return basket
  }

  @SwaggerBaskets.addProduct()
  @Post('products')
  async addProduct(@RequestUser('id') currentUserId: number, @Body() addProductDto: AddProductDto) {
    const product = await this.productsService.getById(addProductDto.productId)

    if (!product) {
      throw new NotFoundException()
    }

    const basket = await this.basketsService.getByUserId(currentUserId)
    await this.basketProductsService.addProduct(basket.id, addProductDto)

    const updatedBasket = await this.basketsService.getByUserId(currentUserId)
    return updatedBasket
  }

  @SwaggerBaskets.removeProduct()
  @Delete('products')
  async removeProduct(@RequestUser('id') currentUserId: number, @Body() removeProductDto: RemoveProductDto) {
    const product = await this.productsService.getById(removeProductDto.productId)

    if (!product) {
      throw new NotFoundException()
    }

    const basket = await this.basketsService.getByUserId(currentUserId)
    await this.basketProductsService.removeProduct(basket.id, removeProductDto)

    const updatedBasket = await this.basketsService.getByUserId(currentUserId)
    return updatedBasket
  }

  @SwaggerBaskets.empty()
  @Delete()
  async empty(@RequestUser('id') currentUserId: number) {
    const basket = await this.basketsService.getByUserId(currentUserId)

    if (!basket.items.length) {
      throw new BadRequestException(ERROR_MESSAGES.basketIsEmpty)
    }

    await this.basketsService.emptyById(basket.id)

    return SUCCESS_RESPONSE
  }

  @SwaggerBaskets.checkout()
  @Post('checkout')
  @HttpCode(200)
  async checkout(@RequestUser('id') currentUserId: number, @Body() checkoutBasketDto: CheckoutBasketDto) {
    const basket = await this.basketsService.getByUserId(currentUserId)

    if (!basket.items.length) {
      throw new BadRequestException(ERROR_MESSAGES.basketIsEmpty)
    }

    const createOrderInput = {
      userId: currentUserId,
      address: checkoutBasketDto.address,
      paymentMethod: checkoutBasketDto.paymentMethod,
      basketItems: basket.items
    }
    const order = await this.ordersService.create(createOrderInput)

    await this.basketsService.emptyById(basket.id)

    return order
  }
}
