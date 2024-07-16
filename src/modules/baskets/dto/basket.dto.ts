import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsInt, IsString, Min } from 'class-validator'
import { VALIDATION_MESSAGES } from '@app/common'
import { CheckoutPaymentMethods } from '../enums/basket.enum'

export class AddProductDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  productId: number

  @ApiProperty({ example: 3, minimum: 1 })
  @Min(1, { message: VALIDATION_MESSAGES.mustBeGreaterThan(1) })
  @IsInt()
  quantity: number

  @ApiProperty({ example: 'red' })
  @IsString()
  color: string
}

export class RemoveProductDto extends AddProductDto {}

export class CheckoutBasketDto {
  @ApiProperty()
  @IsString()
  address: string

  @ApiProperty({ example: CheckoutPaymentMethods.CREDIT_CARD, enum: CheckoutPaymentMethods })
  @IsEnum(CheckoutPaymentMethods)
  paymentMethod: CheckoutPaymentMethods
}
