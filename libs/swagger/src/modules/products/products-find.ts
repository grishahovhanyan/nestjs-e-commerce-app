import { applyDecorators } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'

import { SwaggerNotFound404 } from '../../responses'
import { SWAGGER_SCHEMAS } from '../../schemas'

export function SwaggerProductsFind() {
  return applyDecorators(ApiOkResponse(SWAGGER_SCHEMAS.getProductResponse), SwaggerNotFound404())
}
