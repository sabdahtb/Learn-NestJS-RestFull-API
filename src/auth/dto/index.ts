import {
  IsEmail,
  Matches,
  IsString,
  MinLength,
  IsNotEmpty,
} from 'class-validator'

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  firstName: string

  @IsNotEmpty()
  lastName: string

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/\d/, { message: 'Password must contains string and number' })
  @Matches(/[A-Za-z]/, { message: 'Password must contains string and number' })
  password: string
}

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/\d/, { message: 'Password must contains string and number' })
  @Matches(/[A-Za-z]/, { message: 'Password must contains string and number' })
  password: string
}
