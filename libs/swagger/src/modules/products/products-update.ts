import { applyDecorators } from '@nestjs/common'
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger'

import { SwaggerForbidden403, SwaggerNotFound404 } from '../../responses'
import { SWAGGER_SCHEMAS } from '../../schemas'

export function SwaggerProductsUpdate() {
  return applyDecorators(
    ApiOkResponse(SWAGGER_SCHEMAS.getProductResponse),
    ApiBadRequestResponse(SWAGGER_SCHEMAS.updateProductValidationException),
    SwaggerForbidden403(),
    SwaggerNotFound404()
  )
}
