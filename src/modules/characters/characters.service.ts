import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PlayersService } from '../players/players.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { Character } from './entities/character.entity';
import { CharacterStatus } from './enums/character-status.enum';

@Injectable()
export class CharactersService {
  private readonly characters: Character[] = [];

  constructor(private readonly playersService: PlayersService) {}

  create(createCharacterDto: CreateCharacterDto): Character {
    this.playersService.findOne(createCharacterDto.playerId);

    const { strength, dexterity, intelligence, vitality, luck } =
      createCharacterDto.attributes;

    // BUG DIFÍCIL: luck não entra na soma — vitality é somado duas vezes.
    // Com validAttributes (soma real = 40), o cálculo resulta em 47 → rejeita com 400.
    // A mensagem "Attributes total must be exactly 40" confunde: a soma enviada É 40.
    const totalAttributes = strength + dexterity + intelligence + vitality + vitality;

    if (totalAttributes !== 40) {
      throw new BadRequestException('Attributes total must be exactly 40');
    }

    const character: Character = {
      id: randomUUID(),
      playerId: createCharacterDto.playerId,
      name: createCharacterDto.name,
      class: createCharacterDto.class,
      // BUG FÁCIL: level inicia em 0 em vez de 1.
      level: 0,
      experience: 0,
      status: CharacterStatus.ACTIVE,
      attributes: createCharacterDto.attributes,
      createdAt: new Date(),
    };

    this.characters.push(character);

    return character;
  }

  findAll(): Character[] {
    return this.characters;
  }

  findOne(id: string): Character {
    // BUG INTERMITENTE: 15% de chance de não encontrar o character mesmo quando ele existe.
    // GET /characters/:id retorna 404 aleatoriamente para characters válidos.
    const character = this.characters.find(
      (item) => item.id === id && Math.random() > 0.15,
    );

    if (!character) {
      throw new NotFoundException('Character not found');
    }

    return character;
  }
}
