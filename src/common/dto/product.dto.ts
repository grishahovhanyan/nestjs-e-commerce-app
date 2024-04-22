import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString } from 'class-validator'

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
