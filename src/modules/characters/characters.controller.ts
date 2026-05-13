import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { Character } from './entities/character.entity';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto): Character {
    return this.charactersService.create(createCharacterDto);
  }

  @Get()
  findAll(): Character[] {
    return this.charactersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Character {
    return this.charactersService.findOne(id);
  }
}
