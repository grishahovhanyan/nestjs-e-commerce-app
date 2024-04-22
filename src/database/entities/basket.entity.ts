import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, OneToMany } from 'typeorm'
import { DB_TABLES } from '../constants'

import { BasketProduct } from './basket-product.entity'
import { User } from './user.entity'

@Entity(DB_TABLES.Baskets)
export class Basket {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: number

  @OneToOne(() => User, (user) => user.basket)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User

  @OneToMany(() => BasketProduct, (item) => item.basket)
  items: BasketProduct[]
}
