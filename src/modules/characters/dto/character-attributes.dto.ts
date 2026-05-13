import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class CharacterAttributesDto {
  @ApiProperty({ example: 10, minimum: 0 })
  @IsInt()
  @Min(0)
  strength: number;

  @ApiProperty({ example: 8, minimum: 0 })
  @IsInt()
  @Min(0)
  dexterity: number;

  @ApiProperty({ example: 5, minimum: 0 })
  @IsInt()
  @Min(0)
  intelligence: number;

  @ApiProperty({ example: 12, minimum: 0 })
  @IsInt()
  @Min(0)
  vitality: number;

  @ApiProperty({ example: 5, minimum: 0 })
  @IsInt()
  @Min(0)
  luck: number;
}
