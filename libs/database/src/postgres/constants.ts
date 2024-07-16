import { IDbTables } from './db.interface'

export const DB_TABLES: IDbTables = {
  Users: 'users',
  Products: 'products',
  Baskets: 'baskets',
  BasketProducts: 'basket_products',
  Orders: 'orders',
  OrderProducts: 'order_products'
}

export const DB_RELATIONS = {
  user: 'user',
  creator: 'creator',
  products: 'products',
  basket: 'basket',
  orders: 'orders',
  items: 'items',
  itemsProduct: 'items.product'
}
