import { applyDecorators } from '@nestjs/common'
import { ApiBadRequestResponse } from '@nestjs/swagger'

import { SwaggerSuccess200, SwaggerForbidden403, SwaggerNotFound404 } from '../../responses'
import { SWAGGER_SCHEMAS } from '../../schemas'

export function SwaggerBasketsEmpty() {
  return applyDecorators(
    SwaggerSuccess200(),
    ApiBadRequestResponse(SWAGGER_SCHEMAS.emptyBasketValidationException),
    SwaggerForbidden403(),
    SwaggerNotFound404()
  )
}
