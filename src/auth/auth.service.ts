import * as argon from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { SignInDto, SignUpDto } from './dto'
import { PrismaService } from '~/prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    private prisma: PrismaService
  ) {}

  async signup(dto: SignUpDto) {
    const { email, firstName, lastName, password } = dto
    const hash = await argon.hash(password)

    try {
      const user = await this.prisma.user.create({
        data: {
          hash,
          email,
          lastName,
          firstName,
        },
      })

      return this.getToken(user.id, user.email)
    } catch (error) {
      const emailTaken =
        error instanceof PrismaClientKnownRequestError && error.code === 'P2002'

      if (emailTaken) {
        throw new ForbiddenException('Email has been taken')
      }
      throw error
    }
  }

  async signin(dto: SignInDto) {
    const { email, password } = dto

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (!user) throw new ForbiddenException('Incorrect username or password')

    const matchPassword = await argon.verify(user.hash, password)
    if (!matchPassword)
      throw new ForbiddenException('Incorrect username or password')

    return this.getToken(user.id, user.email)
  }

  async getToken(
    userId: string,
    email: string
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    }
    const secret = this.config.get('JWT_SECRET')

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    })

    return {
      access_token: token,
    }
  }
}
