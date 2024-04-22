import { applyDecorators } from '@nestjs/common'
import { ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger'

import { SWAGGER_SCHEMAS } from '@swagger/schemas'

export function SwaggerBasketsCheckout() {
  return applyDecorators(
    ApiCreatedResponse(SWAGGER_SCHEMAS.getOrderResponse),
    ApiBadRequestResponse(SWAGGER_SCHEMAS.checkoutBasketValidationException)
  )
}
