import { applyDecorators } from '@nestjs/common'
import { ApiBadRequestResponse } from '@nestjs/swagger'

import { SwaggerForbidden403, SwaggerNotFound404, SwaggerSuccess200 } from '@swagger/responses'
import { SWAGGER_SCHEMAS } from '@swagger/schemas'

export function SwaggerBasketsEmpty() {
  return applyDecorators(
    SwaggerSuccess200(),
    ApiBadRequestResponse(SWAGGER_SCHEMAS.emptyBasketValidationException),
    SwaggerForbidden403(),
    SwaggerNotFound404()
  )
}
