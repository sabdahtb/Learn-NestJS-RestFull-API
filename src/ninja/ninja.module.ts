import { Module } from '@nestjs/common'

import { NinjaService } from './ninja.service'
import { NinjaController } from './ninja.controller'

@Module({
  controllers: [NinjaController],
  providers: [NinjaService],
})
export class NinjaModule {}
