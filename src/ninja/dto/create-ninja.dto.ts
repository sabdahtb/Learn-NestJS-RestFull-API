import { IsEnum, IsInt, IsString, MinLength } from 'class-validator'

export class CreateNinjaDto {
  @IsInt()
  id: number

  @IsString()
  @MinLength(3)
  name: string

  @IsEnum(['stars', 'nunchuks'], { message: 'use correct weapon' })
  weapon: 'stars' | 'nunchuks'
}
