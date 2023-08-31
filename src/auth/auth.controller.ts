import { Body, Controller, Post, ValidationPipe } from '@nestjs/common'

import { AuthService } from './auth.service'
import { SignInDto, SignUpDto } from './dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body(new ValidationPipe()) dto: SignUpDto) {
    return this.authService.signup(dto)
  }

  @Post('signin')
  signin(@Body(new ValidationPipe()) dto: SignInDto) {
    return this.authService.signin(dto)
  }
}
