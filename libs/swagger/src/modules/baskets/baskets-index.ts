import { applyDecorators } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'

import { SWAGGER_SCHEMAS } from '../../schemas'

export function SwaggerBasketsIndex() {
  return applyDecorators(ApiOkResponse(SWAGGER_SCHEMAS.getBasketResponse))
}
