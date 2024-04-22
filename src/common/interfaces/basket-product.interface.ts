import { IBasketProductDetail } from './db.interface'

export interface ICreateBasketProductInput {
  basketId: number
  productId: number
  details: IBasketProductDetail[]
}
