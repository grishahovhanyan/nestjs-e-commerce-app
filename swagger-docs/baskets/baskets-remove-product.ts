import { applyDecorators } from '@nestjs/common'
import { ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger'
import { SwaggerNotFound404 } from '@swagger/responses'

import { SWAGGER_SCHEMAS } from '@swagger/schemas'

export function SwaggerBasketsRemoveProduct() {
  return applyDecorators(
    ApiCreatedResponse(SWAGGER_SCHEMAS.getBasketResponse),
    ApiBadRequestResponse(SWAGGER_SCHEMAS.removeBasketProductValidationException),
    SwaggerNotFound404()
  )
}
