import { FindOptionsOrder, FindOptionsWhere } from 'typeorm'

export interface IDbTables {
  Users: 'users'
  Products: 'products'
  Baskets: 'baskets'
  BasketProducts: 'basket_products'
  Orders: 'orders'
  OrderProducts: 'order_products'
}

export interface IOrderObject {
  [key: string]: 'ASC' | 'DESC'
}

export interface IGetAndCountInput {
  page: number
  perPage: number
  order: IOrderObject
}

export interface IFindAndCountInput<T> {
  conditions: FindOptionsWhere<T>
  relations?: string[]
  take: number
  skip: number
  order?: FindOptionsOrder<T>
}

export interface IFindAndCountOutput<T> {
  items: T[]
  totalCount: number
}

export interface IFindInput {
  relations?: string[]
}

export interface IBasketProductDetail {
  color: string
  quantity: number
}

export interface IOrderProductDetail {
  color: string
  quantity: number
  price: number
}
