import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm'
import { IBasketProductDetail } from '@app/database'
import { DB_TABLES } from '../constants'

import { Basket } from './basket.entity'
import { Product } from './product.entity'

@Entity(DB_TABLES.BasketProducts)
export class BasketProduct {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  basketId: number

  @Column()
  productId: number

  @Column('jsonb', { nullable: false, default: [] })
  details: IBasketProductDetail[]

  @ManyToOne(() => Basket, (basket) => basket.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'basketId', referencedColumnName: 'id' })
  basket: Basket

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId', referencedColumnName: 'id' })
  product: Product
}
