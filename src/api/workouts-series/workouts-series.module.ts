import { Module } from '@nestjs/common';
import { WorkoutsSeriesService } from './workouts-series.service';
import { WorkoutsSeriesController } from './workouts-series.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [WorkoutsSeriesController],
  providers: [WorkoutsSeriesService, PrismaService],
})
export class WorkoutsSeriesModule {}
