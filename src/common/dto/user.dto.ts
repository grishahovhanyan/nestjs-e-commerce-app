import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'
import { Match } from '@decorators/match.decorator'
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '@utils/constants'
import { VALIDATION_MESSAGES } from '@utils/messages'

export class RegisterUserDto {
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
  @Match('password', { message: 'must be like password' })
  confirmPassword: string
}

export class LoginUserDto {
  @ApiProperty({ example: 'example@gmail.com' })
  @IsEmail()
  @IsString()
  email: string

  @ApiProperty({ example: 'password' })
  @IsString()
  password: string
}
