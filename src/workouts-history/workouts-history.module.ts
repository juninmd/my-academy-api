import { Module } from '@nestjs/common';
import { WorkoutsHistoryService } from './workouts-history.service';
import { WorkoutsHistoryController } from './workouts-history.controller';

@Module({
  controllers: [WorkoutsHistoryController],
  providers: [WorkoutsHistoryService]
})
export class WorkoutsHistoryModule {}
