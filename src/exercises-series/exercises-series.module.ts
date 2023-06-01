import { Module } from '@nestjs/common';
import { ExercisesSeriesService } from './exercises-series.service';
import { ExercisesSeriesController } from './exercises-series.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ExercisesSeriesController],
  providers: [ExercisesSeriesService, PrismaService],
})
export class ExercisesSeriesModule {}
