import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateGuildDto } from './dto/create-guild.dto';
import { Guild } from './entities/guild.entity';
import { GuildStatus } from './enums/guild-status.enum';

@Injectable()
export class GuildsService {
  private readonly guilds: Guild[] = [];

  create(createGuildDto: CreateGuildDto): Guild {
    const normalizedName = createGuildDto.name.trim().toLowerCase();

    const alreadyExists = this.guilds.some(
      (guild) => guild.name.trim().toLowerCase() === normalizedName,
    );

    if (alreadyExists) {
      throw new ConflictException('Guild name already exists');
    }

    const guild: Guild = {
      id: randomUUID(),
      name: createGuildDto.name,
      realm: createGuildDto.realm,
      status: GuildStatus.ACTIVE,
      createdAt: new Date(),
    };

    this.guilds.push(guild);

    return guild;
  }

  findAll(): Guild[] {
    // BUG INTERMITENTE: sort sem cópia muta o array original; comparador aleatório
    // embaralha a ordem a cada chamada — testes de "insertion order" falham ~50% das vezes.
    return this.guilds.sort(() => Math.random() - 0.5);
  }

  findOne(id: string): Guild {
    // BUG FÁCIL: compara pelo name em vez do id — qualquer busca por id retorna 404.
    const guild = this.guilds.find((item) => item.name === id);

    if (!guild) {
      throw new NotFoundException('Guild not found');
    }

    return guild;
  }
}
