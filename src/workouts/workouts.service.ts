import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { PrismaService } from '../prisma.service';
import { Workout } from './entities/workout.entity';
import { CreateWorkoutSeriesNestedDto } from '../workouts-series/dto/create-workout-series-nested.dto';

@Injectable()
export class WorkoutsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createWorkoutDto: CreateWorkoutDto): Promise<Workout> {
    const {
      exerciseId,
      description,
      workoutsGroupsId,
      methodId,
      workoutSeries,
    } = createWorkoutDto;

    return this.prismaService.workouts.create({
      data: {
        exerciseId,
        description: description ?? '',
        workoutsGroupsId,
        methodId,
        workoutSeries: workoutSeries
          ? {
              create: this.mapToSeriesCreate(workoutSeries),
            }
          : undefined,
      },
      include: { workoutSeries: true },
    });
  }

  async findAll(): Promise<Workout[]> {
    return this.prismaService.workouts.findMany({
      include: { workoutSeries: true },
    });
  }

  async findOne(id: number): Promise<Workout> {
    const workout = await this.prismaService.workouts.findUnique({
      where: { id },
      include: { workoutSeries: true },
    });

    if (!workout) {
      throw new NotFoundException(`Workout #${id} not found`);
    }

    return workout;
  }

  async update(id: number, updateDto: UpdateWorkoutDto): Promise<Workout> {
    await this.findOne(id);

    const { exerciseId, description, workoutsGroupsId, methodId, workoutSeries } =
      updateDto;

    if (workoutSeries) {
      return this.prismaService.$transaction(async (tx) => {
        // Delete existing series
        await tx.workoutSeries.deleteMany({
          where: { workoutId: id },
        });

        // Update workout and re-create series
        return tx.workouts.update({
          where: { id },
          data: {
            exerciseId,
            description,
            workoutsGroupsId,
            methodId,
            workoutSeries: {
              create: this.mapToSeriesCreate(workoutSeries),
            },
          },
          include: { workoutSeries: true },
        });
      });
    }

    return this.prismaService.workouts.update({
      where: { id },
      data: {
        exerciseId,
        description,
        workoutsGroupsId,
        methodId,
      },
      include: { workoutSeries: true },
    });
  }

  async remove(id: number): Promise<Workout> {
    await this.findOne(id);

    return this.prismaService.workouts.delete({
      where: { id },
      include: { workoutSeries: true },
    });
  }

  private mapToSeriesCreate(series: CreateWorkoutSeriesNestedDto[]) {
    return series.map((item) => ({
      repetitions: item.repetitions,
      weight: item.weight,
      rest: item.rest,
      time: item.time,
      distance: item.distance,
      speed: item.speed,
    }));
  }
}
