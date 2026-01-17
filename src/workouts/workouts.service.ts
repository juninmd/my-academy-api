import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { Workouts } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class WorkoutsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createWorkoutDto: CreateWorkoutDto): Promise<Workouts> {
    const { workoutSeries, id, ...rest } = createWorkoutDto;

    return this.prismaService.workouts.create({
      data: {
        ...rest,
        description: rest.description || '',
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

    const { workoutSeries, id: _, ...rest } = updateDto;

    return this.prismaService.workouts.update({
      where: { id },
      data: rest,
    });
  }

  async remove(id: number): Promise<Workouts> {
    await this.findOne(id);

    return this.prismaService.workouts.delete({ where: { id } });
  }
}
