import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkoutsGroupDto } from './dto/create-workouts-group.dto';
import { UpdateWorkoutsGroupDto } from './dto/update-workouts-group.dto';
import { PrismaService } from '../prisma.service';
import { WorkoutsGroup } from './entities/workouts-group.entity';
import { CreateWorkoutNestedDto } from '../workouts/dto/create-workout-nested.dto';

@Injectable()
export class WorkoutsGroupsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateWorkoutsGroupDto): Promise<WorkoutsGroup> {
    const { name, image, userId, workouts } = data;
    return this.prismaService.workoutsGroups.create({
      data: {
        name,
        image,
        userId,
        workouts: {
          create: this.mapWorkoutsCreate(workouts),
        },
      },
    });
  }

  async findAll(userId: string): Promise<WorkoutsGroup[]> {
    return this.prismaService.workoutsGroups.findMany({ where: { userId } });
  }

  async findAllExercises(id: number): Promise<WorkoutsGroup> {
    return this.findOne(id);
  }

  async findOne(id: number): Promise<WorkoutsGroup> {
    const group = await this.prismaService.workoutsGroups.findUnique({
      where: { id },
      include: {
        workouts: {
          include: {
            workoutSeries: true,
            exercise: true,
            method: true,
          },
        },
      },
    });
    if (!group) {
      throw new NotFoundException(`WorkoutsGroup #${id} not found`);
    }
    return group;
  }

  async update(id: number, data: UpdateWorkoutsGroupDto): Promise<WorkoutsGroup> {
    await this.findOne(id);

    const { name, image, userId, workouts } = data;

    return this.prismaService.$transaction(async (tx) => {
      // Delete existing workouts
      await tx.workouts.deleteMany({
        where: { workoutsGroupsId: id },
      });

      return tx.workoutsGroups.update({
        where: { id },
        data: {
          name,
          image,
          userId,
          workouts: {
            create: this.mapWorkoutsCreate(workouts),
          },
        },
        include: {
          workouts: {
            include: {
              workoutSeries: true,
            },
          },
        },
      });
    });
  }

  async remove(id: number): Promise<WorkoutsGroup> {
    await this.findOne(id);
    return this.prismaService.workoutsGroups.delete({
      where: { id },
      include: { WorkoutSessions: true },
    });
  }

  private mapWorkoutsCreate(workouts?: CreateWorkoutNestedDto[]) {
    if (!workouts) return [];
    return workouts.map((workout) => ({
      exerciseId: workout.exerciseId,
      description: workout.description || '',
      methodId: workout.methodId,
      workoutSeries: {
        create: workout.workoutSeries?.map((series) => ({
          repetitions: series.repetitions,
          weight: series.weight,
          rest: series.rest,
          time: series.time,
          distance: series.distance,
          speed: series.speed,
        })),
      },
    }));
  }
}
