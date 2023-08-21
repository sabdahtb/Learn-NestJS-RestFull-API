import { Injectable } from '@nestjs/common'

import { CreateNinjaDto } from './dto'

@Injectable()
export class NinjaService {
  private ninjas: CreateNinjaDto[] = [
    { id: 0, name: 'maman', weapon: 'stars' },
    { id: 1, name: 'kolan', weapon: 'nunchuks' },
  ]

  create(ninja: CreateNinjaDto): CreateNinjaDto[] {
    return [...this.ninjas, ninja]
  }

  findAll() {
    return this.ninjas
  }

  findOne(id: number) {
    const ninja = this.ninjas.find((it) => it.id === id)

    if (!ninja) throw new Error()
    return ninja
  }

  update(ninja: CreateNinjaDto): CreateNinjaDto[] {
    return [...this.ninjas.filter((it) => it.id !== ninja.id), ninja]
  }

  remove(id: number) {
    return this.ninjas.filter((it) => it.id !== id)
  }
}
