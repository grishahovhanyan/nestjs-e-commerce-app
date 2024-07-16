import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'
import { Match, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, VALIDATION_MESSAGES } from '@app/common'

export class RegisterDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  firstName: string

  @ApiProperty({ example: 'Doe' })
  @IsString()
  lastName: string

  @ApiProperty({ example: 'example@gmail.com' })
  @IsEmail()
  @IsString()
  email: string

  @ApiProperty({ example: 'password' })
  @MaxLength(PASSWORD_MAX_LENGTH, { message: VALIDATION_MESSAGES.lengthMustBeLessThan(PASSWORD_MAX_LENGTH) })
  @MinLength(PASSWORD_MIN_LENGTH, { message: VALIDATION_MESSAGES.lengthMustBeGreaterThan(PASSWORD_MIN_LENGTH) })
  @IsString()
  password: string

  @ApiProperty({ example: 'password' })
  @IsString()
  @Match('password', { message: VALIDATION_MESSAGES.passwordMismatch })
  confirmPassword: string
}

export class LoginDto {
  @ApiProperty({ example: 'example@gmail.com' })
  @IsEmail()
  @IsString()
  email: string

  @ApiProperty({ example: 'password' })
  @IsString()
  password: string
}
