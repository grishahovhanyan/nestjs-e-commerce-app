import { Transactional } from 'typeorm-transactional'
import { Injectable } from '@nestjs/common'

import { User, DB_RELATIONS } from '@app/database'
import { CreateUserDto } from './dto/user.dto'

import { UsersRepository } from './users.repository'
import { BasketsService } from '@modules/baskets/baskets.service'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository, private readonly basketsService: BasketsService) {}

  @Transactional()
  async create(createUserInput: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.create(createUserInput)
    const basket = await this.basketsService.create({ userId: user.id })
    user.basket = basket

    return user
  }

  async getById(userId: number): Promise<User | null> {
    return await this.usersRepository.findOne(
      { id: userId },
      { relations: [DB_RELATIONS.products, DB_RELATIONS.basket, DB_RELATIONS.orders] }
    )
  }

  async getByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ email }, { relations: [DB_RELATIONS.products] })
  }
}
