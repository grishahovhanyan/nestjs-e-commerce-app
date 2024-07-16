import { applyDecorators } from '@nestjs/common'
import { ApiOkResponse, ApiBadRequestResponse } from '@nestjs/swagger'

import { SWAGGER_SCHEMAS } from '../../schemas'

export function SwaggerBasketsCheckout() {
  return applyDecorators(
    ApiOkResponse(SWAGGER_SCHEMAS.getOrderResponse),
    ApiBadRequestResponse(SWAGGER_SCHEMAS.checkoutBasketValidationException)
  )
}
