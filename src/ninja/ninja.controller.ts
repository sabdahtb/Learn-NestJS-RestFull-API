import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
  NotFoundException,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common'

import { BeltGuard } from '~/belt/belt.guard'

import { CreateNinjaDto } from './dto'
import { NinjaService } from './ninja.service'

@Controller('ninja')
// @UseGuards(BeltGuard) -> if guard is for all controller
export class NinjaController {
  constructor(private readonly ninjaService: NinjaService) {}

  @Post()
  create(@Body(new ValidationPipe()) dto: CreateNinjaDto) {
    return this.ninjaService.create(dto)
  }

  @Get()
  findAll() {
    return this.ninjaService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.ninjaService.findOne(id)
    } catch (error) {
      throw new NotFoundException()
    }
  }

  @Patch()
  @UseGuards(BeltGuard)
  update(@Body(new ValidationPipe()) dto: CreateNinjaDto) {
    return this.ninjaService.update(dto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ninjaService.remove(id)
  }
}
