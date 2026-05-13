import { Module } from '@nestjs/common';
import { PlayersModule } from '../players/players.module';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';

@Module({
  imports: [PlayersModule],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {}
