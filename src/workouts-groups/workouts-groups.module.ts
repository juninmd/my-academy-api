import { Module } from '@nestjs/common';
import { WorkoutsGroupsService } from './workouts-groups.service';
import { WorkoutsGroupsController } from './workouts-groups.controller';

@Module({
  controllers: [WorkoutsGroupsController],
  providers: [WorkoutsGroupsService]
})
export class WorkoutsGroupsModule {}
