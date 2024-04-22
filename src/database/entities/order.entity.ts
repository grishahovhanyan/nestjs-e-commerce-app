import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm'
import { DB_TABLES } from '../constants'

import { OrderProduct } from './order-product.entity'
import { User } from './user.entity'

@Entity(DB_TABLES.Orders)
export class Order {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: number

  @Column()
  address: string

  @Column()
  paymentMethod: string

  @Column()
  totalPrice: number

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date

  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User

  @OneToMany(() => OrderProduct, (item) => item.order)
  items: OrderProduct[]
}
