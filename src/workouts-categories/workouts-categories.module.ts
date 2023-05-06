import { Module } from '@nestjs/common';
import { WorkoutsCategoriesService } from './workouts-categories.service';
import { WorkoutsCategoriesController } from './workouts-categories.controller';

@Module({
  controllers: [WorkoutsCategoriesController],
  providers: [WorkoutsCategoriesService]
})
export class WorkoutsCategoriesModule {}
