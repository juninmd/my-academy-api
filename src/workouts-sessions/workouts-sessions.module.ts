import { Module } from '@nestjs/common';
import { WorkoutsSessionsService } from './workouts-sessions.service';
import { WorkoutsSessionsController } from './workouts-sessions.controller';

@Module({
  controllers: [WorkoutsSessionsController],
  providers: [WorkoutsSessionsService]
})
export class WorkoutsSessionsModule { }
