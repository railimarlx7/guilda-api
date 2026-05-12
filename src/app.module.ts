import { Module } from '@nestjs/common';
import { CharactersModule } from './modules/characters/characters.module';
import { GuildsModule } from './modules/guilds/guilds.module';
import { PlayersModule } from './modules/players/players.module';

@Module({
  imports: [GuildsModule, PlayersModule, CharactersModule],
})
export class AppModule {}
