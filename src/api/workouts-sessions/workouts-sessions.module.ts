import { Module } from '@nestjs/common';
import { WorkoutsSessionsService } from './workouts-sessions.service';
import { WorkoutsSessionsController } from './workouts-sessions.controller';
import { PrismaService } from '../../prisma.service';
import { CacheModule } from '@nestjs/cache-manager';
import { TelegramService } from '../telegram/telegram.service';
import { NotificationsService } from '../notifications/notifications.service';
import { UsersService } from '../users/users.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [WorkoutsSessionsController],
  providers: [
    WorkoutsSessionsService,
    PrismaService,
    TelegramService,
    NotificationsService,
    UsersService,
  ],
})
export class WorkoutsSessionsModule {}
