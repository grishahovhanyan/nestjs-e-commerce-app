import { applyDecorators } from '@nestjs/common'
import { ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger'
import { SwaggerNotFound404 } from '@swagger/responses'

import { SWAGGER_SCHEMAS } from '@swagger/schemas'

export function SwaggerBasketsAddProduct() {
  return applyDecorators(
    ApiCreatedResponse(SWAGGER_SCHEMAS.getBasketResponse),
    ApiBadRequestResponse(SWAGGER_SCHEMAS.addBasketProductValidationException),
    SwaggerNotFound404()
  )
}
