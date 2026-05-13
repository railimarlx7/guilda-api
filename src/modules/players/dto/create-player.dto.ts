import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreatePlayerDto {
  @ApiProperty({ example: 'Junior' })
  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'junior@guild.com' })
  @Transform(({ value }) => value?.trim().toLowerCase())
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  @IsString()
  @IsNotEmpty()
  guildId: string;
}
