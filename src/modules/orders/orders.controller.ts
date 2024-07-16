import { Controller, Get, Query } from '@nestjs/common'
import { SWAGGER_TAGS, SwaggerPrivateRoute, SwaggerOrders } from '@app/swagger'

import {
  RequestUser,
  PAGE_SIZE_TYPES,
  getPageSize,
  paginatedResponse,
  ORDERS_SORT_FIELDS,
  getSortOrderFromQuery
} from '@app/common'
import { GetOrdersDto } from './dto/order.dto'
import { OrdersService } from './orders.service'

@SwaggerPrivateRoute(SWAGGER_TAGS.Orders)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @SwaggerOrders.index()
  @Get()
  async index(@RequestUser('id') currentUserId: number, @Query() query: GetOrdersDto) {
    const page = +query.page || 1
    const perPage = getPageSize(PAGE_SIZE_TYPES.orders, +query.perPage)
    const order = getSortOrderFromQuery(query.ordering?.split(',') ?? [], ORDERS_SORT_FIELDS)

    const getAndCountInput = {
      page,
      perPage,
      order,
      userId: currentUserId,
      createdAtGte: query.createdAtGte,
      createdAtLte: query.createdAtLte
    }

    const { items, totalCount } = await this.ordersService.getAndCount(getAndCountInput)

    return paginatedResponse(totalCount, page, perPage, items)
  }
}
