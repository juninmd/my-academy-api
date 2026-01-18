import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { PrismaService } from '../prisma.service';
import { Workouts } from '@prisma/client';

@Injectable()
export class WorkoutsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createWorkoutDto: CreateWorkoutDto): Promise<Workouts> {
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
              create: workoutSeries.map((series) => ({
                repetitions: series.repetitions,
                weight: series.weight,
                rest: series.rest,
              })),
            }
          : undefined,
      },
    });
  }

  findAll(): Promise<Workouts[]> {
    return this.prismaService.workouts.findMany({
      include: { workoutSeries: true },
    });
  }

  async findOne(id: number): Promise<Workouts> {
    const workout = await this.prismaService.workouts.findUnique({
      where: { id },
      include: { workoutSeries: true },
    });

    if (!workout) {
      throw new NotFoundException(`Workout #${id} not found`);
    }

    return workout;
  }

  async update(id: number, updateDto: UpdateWorkoutDto): Promise<Workouts> {
    await this.findOne(id);

    const { exerciseId, description, workoutsGroupsId, methodId } = updateDto;

    return this.prismaService.workouts.update({
      where: { id },
      data: {
        exerciseId,
        description,
        workoutsGroupsId,
        methodId,
      },
    });
  }

  async remove(id: number): Promise<Workouts> {
    await this.findOne(id);

    return this.prismaService.workouts.delete({ where: { id } });
  }
}
