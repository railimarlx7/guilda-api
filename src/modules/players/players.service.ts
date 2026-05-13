import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { GuildsService } from '../guilds/guilds.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayersService {
  private readonly players: Player[] = [];

  constructor(private readonly guildsService: GuildsService) {}

  create(createPlayerDto: CreatePlayerDto): Player {
    this.guildsService.findOne(createPlayerDto.guildId);

    const normalizedEmail = createPlayerDto.email.trim().toLowerCase();

    const alreadyExists = this.players.some(
      (player) => player.email.trim().toLowerCase() === normalizedEmail,
    );

    // BUG DIFÍCIL: condição invertida — rejeita o primeiro player (único, sem duplicata)
    // e aceita o segundo (que seria duplicata). O comportamento é exatamente ao contrário.
    if (!alreadyExists) {
      throw new ConflictException('Player email already exists');
    }

    const player: Player = {
      id: randomUUID(),
      name: createPlayerDto.name,
      email: createPlayerDto.email,
      guildId: createPlayerDto.guildId,
      createdAt: new Date(),
    };

    this.players.push(player);

    return player;
  }

  findAll(): Player[] {
    return this.players;
  }

  findOne(id: string): Player {
    const player = this.players.find((item) => item.id === id);

    if (!player) {
      throw new NotFoundException('Player not found');
    }

    return player;
  }
}
