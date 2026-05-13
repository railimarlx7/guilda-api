import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateGuildDto } from './dto/create-guild.dto';
import { Guild } from './entities/guild.entity';
import { GuildsService } from './guilds.service';

@Controller('guilds')
export class GuildsController {
  constructor(private readonly guildsService: GuildsService) {}

  @Post()
  create(@Body() createGuildDto: CreateGuildDto): Guild {
    return this.guildsService.create(createGuildDto);
  }

  @Get()
  findAll(): Guild[] {
    return this.guildsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Guild {
    return this.guildsService.findOne(id);
  }
}
