import { BasketProduct } from './basket-product.entity'
import { Basket } from './basket.entity'
import { OrderProduct } from './order-product.entity'
import { Order } from './order.entity'
import { Product } from './product.entity'
import { User } from './user.entity'

export const POSTGRES_ENTITIES = [BasketProduct, Basket, OrderProduct, Order, Product, User]

export * from './basket-product.entity'
export * from './basket.entity'
export * from './order-product.entity'
export * from './order.entity'
export * from './product.entity'
export * from './user.entity'
