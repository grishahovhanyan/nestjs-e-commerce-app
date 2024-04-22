import { IGetAndCountInput } from './db.interface'
import { BasketProduct } from '@entities/basket-product.entity'

export interface IGetOrdersInput extends IGetAndCountInput {
  userId: number
  createdAtGte?: string
  createdAtLte?: string
}

export interface ICreateOrderInput {
  userId: number
  address: string
  paymentMethod: string
  basketItems: BasketProduct[]
}
