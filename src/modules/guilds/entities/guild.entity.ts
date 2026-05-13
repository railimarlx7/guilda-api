import { ApiProperty } from '@nestjs/swagger';
import { GuildStatus } from '../enums/guild-status.enum';

export class Guild {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  id: string;

  @ApiProperty({ example: 'Shadow Wolves' })
  name: string;

  @ApiProperty({ example: 'Valoria' })
  realm: string;

  @ApiProperty({ enum: GuildStatus, example: GuildStatus.ACTIVE })
  status: GuildStatus;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;
}
