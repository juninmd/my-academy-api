import { Module } from '@nestjs/common';
import { WorkoutsPersonalsSessionsService } from './workouts-personals-sessions.service';
import { WorkoutsPersonalsSessionsController } from './workouts-personals-sessions.controller';
import { PrismaService } from '../prisma.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register()],
  controllers: [WorkoutsPersonalsSessionsController],
  providers: [WorkoutsPersonalsSessionsService, PrismaService],
})
export class WorkoutsPersonalsSessionsModule { }
