import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './entities/player.entity';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto): Player {
    return this.playersService.create(createPlayerDto);
  }

  @Get()
  findAll(): Player[] {
    return this.playersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Player {
    return this.playersService.findOne(id);
  }
}
