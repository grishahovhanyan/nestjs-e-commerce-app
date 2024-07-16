import { IBasketProductDetail } from '@app/database'

export class CreateBasketProductDto {
  basketId: number
  productId: number
  details: IBasketProductDetail[]
}
