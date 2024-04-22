import { Controller, Get, Query } from '@nestjs/common'
import { SWAGGER_TAGS } from '@swagger/utils'
import { SwaggerPrivateRoute } from '@swagger/utils'
import { SwaggerOrders } from '@swagger/orders'

import { RequestUser } from '@decorators/user.decorator'
import { PAGE_SIZE_TYPES, getPageSize, paginatedResponse } from '@utils/pagination'
import { ORDERS_SORT_FIELDS } from '@utils/constants'
import { getSortOrderFromQuery } from '@utils/helpers'
import { IGetOrdersQuery } from '@interfaces/request.interface'
import { IGetOrdersInput } from '@interfaces/order.interface'

import { OrdersService } from './orders.service'

@SwaggerPrivateRoute(SWAGGER_TAGS.Orders)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @SwaggerOrders.index()
  @Get()
  async index(@RequestUser('id') currentUserId: number, @Query() query: IGetOrdersQuery) {
    const page = +query.page || 1
    const perPage = getPageSize(PAGE_SIZE_TYPES.orders, +query.perPage)
    const order = getSortOrderFromQuery(query.ordering?.split(',') ?? [], ORDERS_SORT_FIELDS)

    const getAndCountInput: IGetOrdersInput = {
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
