import { IsOptional, IsString } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { BasketProduct, IOrderObject } from '@app/database'
import { getOrderingDescription } from '@app/swagger'
import { ORDERS_SORT_FIELDS, PaginationDto } from '@app/common'

export class GetOrdersDto extends PaginationDto {
  @ApiPropertyOptional({ description: getOrderingDescription(ORDERS_SORT_FIELDS) })
  @IsString()
  @IsOptional()
  ordering?: string

  @ApiPropertyOptional({ description: 'createdAt greater than equal (Must be in ISO date format)' })
  @IsString()
  @IsOptional()
  createdAtGte?: string

  @ApiPropertyOptional({ description: 'createdAt less than equal (Must be in ISO date format)' })
  @IsString()
  @IsOptional()
  createdAtLte?: string

  userId: number
  order?: IOrderObject
}

export interface CreateOrderDto {
  userId: number
  address: string
  paymentMethod: string
  basketItems: BasketProduct[]
}
