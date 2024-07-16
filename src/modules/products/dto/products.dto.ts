import { IsNumber, IsOptional, IsString } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IOrderObject } from '@app/database'
import { PaginationDto } from '@app/common'

export class GetProductsDto extends PaginationDto {
  @ApiPropertyOptional({ example: 1599 })
  @IsString()
  @IsOptional()
  ordering?: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  category?: string

  userId: number
  order?: IOrderObject
}

export class CreateProductDto {
  @ApiProperty({ example: 'Iphone 15' })
  @IsString()
  name: string

  @ApiProperty({ example: 'phone' })
  @IsString()
  category: string

  @ApiProperty({ example: 1599 })
  @IsNumber()
  price: number

  @ApiProperty({ example: 'Iphone 15' })
  @IsString()
  description: string

  createdBy: number
}

export class UpdateProductDto {
  @ApiPropertyOptional({ example: 'Iphone 15' })
  @IsString()
  @IsOptional()
  name: string

  @ApiPropertyOptional({ example: 'phone' })
  @IsString()
  @IsOptional()
  category: string

  @ApiPropertyOptional({ example: 1599 })
  @IsNumber()
  @IsOptional()
  price: number

  @ApiPropertyOptional({ example: 'Iphone 15' })
  @IsString()
  @IsOptional()
  description: string
}
