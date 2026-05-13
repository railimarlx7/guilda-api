import { ApiProperty } from '@nestjs/swagger';
import { CharacterClass } from '../enums/character-class.enum';
import { CharacterStatus } from '../enums/character-status.enum';

export interface CharacterAttributes {
  strength: number;
  dexterity: number;
  intelligence: number;
  vitality: number;
  luck: number;
}

export class Character {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  id: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  playerId: string;

  @ApiProperty({ example: 'Arthos' })
  name: string;

  @ApiProperty({ enum: CharacterClass, example: CharacterClass.WARRIOR })
  class: CharacterClass;

  @ApiProperty({ example: 1 })
  level: number;

  @ApiProperty({ example: 0 })
  experience: number;

  @ApiProperty({ enum: CharacterStatus, example: CharacterStatus.ACTIVE })
  status: CharacterStatus;

  @ApiProperty({
    example: { strength: 10, dexterity: 8, intelligence: 5, vitality: 12, luck: 5 },
  })
  attributes: CharacterAttributes;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;
}
