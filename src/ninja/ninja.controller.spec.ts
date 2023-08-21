import { Test, TestingModule } from '@nestjs/testing'

import { NinjaService } from './ninja.service'
import { NinjaController } from './ninja.controller'

describe('NinjaController', () => {
  let controller: NinjaController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NinjaController],
      providers: [NinjaService],
    }).compile()

    controller = module.get<NinjaController>(NinjaController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
