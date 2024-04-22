import { IGetAndCountInput } from './db.interface'

export interface IGetProductsInput extends IGetAndCountInput {
  userId: number
  category?: string
}

export interface ICreateProductInput {
  createdBy: number
  name: string
  category: string
  price: number
  description: string
}
