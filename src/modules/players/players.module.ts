import { Module } from '@nestjs/common';
import { GuildsModule } from '../guilds/guilds.module';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';

@Module({
  imports: [GuildsModule],
  controllers: [PlayersController],
  providers: [PlayersService],
  exports: [PlayersService],
})
export class PlayersModule {}
