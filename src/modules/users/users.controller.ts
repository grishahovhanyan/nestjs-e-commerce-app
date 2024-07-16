import { Get, Controller } from '@nestjs/common'
import { SWAGGER_TAGS, SwaggerPrivateRoute, SwaggerUsers } from '@app/swagger'

import { RequestUser } from '@app/common'
import { UsersService } from './users.service'

@SwaggerPrivateRoute(SWAGGER_TAGS.Users)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @SwaggerUsers.getMe()
  @Get('me')
  async getMe(@RequestUser('id') currentUserId: number) {
    return await this.usersService.getById(currentUserId)
  }
}
