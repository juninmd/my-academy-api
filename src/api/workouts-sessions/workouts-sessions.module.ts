import { Module } from '@nestjs/common';
import { WorkoutsSessionsService } from './workouts-sessions.service';
import { WorkoutsSessionsController } from './workouts-sessions.controller';
import { PrismaService } from '../../prisma.service';
import { CacheModule } from '@nestjs/cache-manager';
import { TelegramService } from '../telegram/telegram.service';
import { NotificationsService } from '../notifications/notifications.service';
import { UsersService } from '../users/users.service';
import { TelegramModule } from '../telegram/telegram.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { UsersModule } from '../users/users.module';
import { PrismaModule } from '../../prisma.module';

@Module({
  imports: [
    CacheModule.register(),
    TelegramModule,
    NotificationsModule,
    UsersModule,
    PrismaModule,
  ],
  controllers: [WorkoutsSessionsController],
  providers: [WorkoutsSessionsService],
})
export class WorkoutsSessionsModule { }
