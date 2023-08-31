import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { JwtStrategy } from './strategy'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'

@Module({
  controllers: [AuthController],
  imports: [JwtModule.register({})],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
