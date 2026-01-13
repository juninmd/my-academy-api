import { Module } from '@nestjs/common';
import { WorkoutsSessionsService } from './workouts-sessions.service';
import { WorkoutsSessionsController } from './workouts-sessions.controller';
import { PrismaService } from '../prisma.service';
import { CacheModule } from '@nestjs/cache-manager';
import { TelegramService } from '../telegram/telegram.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [WorkoutsSessionsController],
  providers: [WorkoutsSessionsService, PrismaService, TelegramService],
})
export class WorkoutsSessionsModule {}
