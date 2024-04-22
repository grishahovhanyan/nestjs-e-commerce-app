import { Get, Controller } from '@nestjs/common'
import { SWAGGER_TAGS, SwaggerPrivateRoute } from '@swagger/utils'
import { SwaggerUsers } from '@swagger/users'

import { RequestUser } from '@decorators/user.decorator'
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
