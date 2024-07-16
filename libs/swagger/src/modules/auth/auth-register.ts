import { applyDecorators } from '@nestjs/common'
import { ApiBadRequestResponse } from '@nestjs/swagger'

import { SwaggerSuccess200 } from '../../responses'
import { SWAGGER_SCHEMAS } from '../../schemas'

export function SwaggerAuthRegister() {
  return applyDecorators(SwaggerSuccess200(), ApiBadRequestResponse(SWAGGER_SCHEMAS.registerValidationException))
}
