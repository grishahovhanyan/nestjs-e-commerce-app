import { BasketsService } from './../baskets/baskets.service'
import { Injectable } from '@nestjs/common'

import { ICreateUserInput } from '@interfaces/user.interface'
import { DB_RELATIONS } from '@database/constants'
import { UsersRepository } from './users.repository'

import { User } from '@entities/user.entity'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository, private readonly basketsService: BasketsService) {}

  async create(createUserInput: ICreateUserInput): Promise<User> {
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
