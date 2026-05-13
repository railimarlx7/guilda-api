import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsEnum, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CharacterClass } from '../enums/character-class.enum';
import { CharacterAttributesDto } from './character-attributes.dto';

export class CreateCharacterDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  @IsString()
  @IsNotEmpty()
  playerId: string;

  @ApiProperty({ example: 'Arthos' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: CharacterClass, example: CharacterClass.WARRIOR })
  @IsEnum(CharacterClass)
  class: CharacterClass;

  // @IsDefined() é necessário porque @ValidateNested() não rejeita undefined sozinho.
  @ApiProperty({ type: CharacterAttributesDto })
  @IsDefined()
  @ValidateNested()
  @Type(() => CharacterAttributesDto)
  attributes: CharacterAttributesDto;
}
