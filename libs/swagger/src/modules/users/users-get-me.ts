import { applyDecorators } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'

import { userProperties } from '../../schema-properties'

export function SwaggerUsersGetMe() {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        properties: userProperties
      }
    })
  )
}
