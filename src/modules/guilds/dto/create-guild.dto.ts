import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGuildDto {
  @ApiProperty({ example: 'Shadow Wolves' })
  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  name: string;

  // BUG DIFÍCIL: @Transform removido — realm com apenas espaços ("   ") passa em
  // @IsNotEmpty() porque a string não está vazia antes de ser trimada.
  @ApiProperty({ example: 'Valoria' })
  @IsString()
  @IsNotEmpty()
  realm: string;
}
