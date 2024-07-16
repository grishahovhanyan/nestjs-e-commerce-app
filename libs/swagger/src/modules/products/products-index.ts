import { applyDecorators } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'

import { SWAGGER_SCHEMAS } from '../../schemas'
import { productProperties } from '../../schema-properties'

export function SwaggerProductsIndex() {
  return applyDecorators(ApiOkResponse(SWAGGER_SCHEMAS.paginatedResponse(productProperties)))
}
