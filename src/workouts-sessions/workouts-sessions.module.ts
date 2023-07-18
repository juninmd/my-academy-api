import { Module } from '@nestjs/common';
import { WorkoutsSessionsService } from './workouts-sessions.service';
import { WorkoutsSessionsController } from './workouts-sessions.controller';
import { PrismaService } from '../prisma.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register()],
  controllers: [WorkoutsSessionsController],
  providers: [WorkoutsSessionsService, PrismaService],
})
export class WorkoutsSessionsModule { }
