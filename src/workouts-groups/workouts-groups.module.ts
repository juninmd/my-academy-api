import { Module } from '@nestjs/common';
import { WorkoutsGroupsService } from './workouts-groups.service';
import { WorkoutsGroupsController } from './workouts-groups.controller';
import { PrismaService } from '../prisma.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register()],
  controllers: [WorkoutsGroupsController],
  providers: [WorkoutsGroupsService, PrismaService],
})
export class WorkoutsGroupsModule { }
