import { Injectable } from '@nestjs/common';
import { WorkoutSeries } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateWorkoutsSeriesDto } from './dto/create-workouts-series.dto';
import { UpdateExercisesSeriesDto } from './dto/update-workouts-series.dto';

@Injectable()
export class WorkoutsSeriesService {
  constructor(private readonly prismaService: PrismaService) { }

  create(createWorkoutsSeriesDto: CreateWorkoutsSeriesDto) {
    return this.prismaService.workoutSeries.create({
      data: createWorkoutsSeriesDto as WorkoutSeries,
    });
  }

  findAll() {
    return this.prismaService.workoutSeries.findMany();
  }

  findOne(id: number) {
    return this.prismaService.workoutSeries.findUnique({
      where: { id: Number(id) },
    });
  }

  update(id: number, updateDto: UpdateExercisesSeriesDto) {
    return this.prismaService.workoutSeries.update({
      where: { id: Number(id) },
      data: updateDto as WorkoutSeries,
    });
  }

  remove(id: number) {
    return this.prismaService.workoutSeries.delete({
      where: { id: Number(id) },
    });
  }
}
