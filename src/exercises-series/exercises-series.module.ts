import { Module } from '@nestjs/common';
import { ExercisesSeriesService } from './exercises-series.service';
import { ExercisesSeriesController } from './exercises-series.controller';

@Module({
  controllers: [ExercisesSeriesController],
  providers: [ExercisesSeriesService]
})
export class ExercisesSeriesModule {}
