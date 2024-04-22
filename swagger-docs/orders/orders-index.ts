import { applyDecorators } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'

import { ORDERS_SORT_FIELDS } from '@utils/constants'
import { getOrderingDescription, orderProperties } from '@swagger/schema-properties'
import { SwaggerQueryParam } from '@swagger/utils'
import { SWAGGER_SCHEMAS } from '@swagger/schemas'

export function SwaggerOrdersIndex() {
  return applyDecorators(
    SwaggerQueryParam('page'),
    SwaggerQueryParam('perPage'),
    SwaggerQueryParam('ordering', false, getOrderingDescription(ORDERS_SORT_FIELDS)),
    SwaggerQueryParam('createdAtGte', false, 'createdAt greater than equal (Must be in ISO date format)'),
    SwaggerQueryParam('createdAtLte', false, 'createdAt less than equal (Must be in ISO date format)'),
    ApiOkResponse(SWAGGER_SCHEMAS.paginatedResponse(orderProperties))
  )
}
