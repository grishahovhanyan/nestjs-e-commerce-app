import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm'
import { IOrderProductDetail } from '@app/database'
import { DB_TABLES } from '../constants'

import { Product } from './product.entity'
import { Order } from './order.entity'

@Entity(DB_TABLES.OrderProducts)
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  orderId: number

  @Column()
  productId: number

  @Column('jsonb', { nullable: false, default: [] })
  details: IOrderProductDetail[]

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId', referencedColumnName: 'id' })
  order: Order

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId', referencedColumnName: 'id' })
  product: Product
}
