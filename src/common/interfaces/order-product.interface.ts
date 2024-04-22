import { IOrderProductDetail } from './db.interface'

export interface IOrderProduct {
  id: number
  orderId: number
  productId: number
  details: IOrderProductDetail[]
}
