import { Module } from '@nestjs/common';
import { WorkoutsGroupsService } from './workouts-groups.service';
import { WorkoutsGroupsController } from './workouts-groups.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [WorkoutsGroupsController],
  providers: [WorkoutsGroupsService, PrismaService]
})
export class WorkoutsGroupsModule {}
