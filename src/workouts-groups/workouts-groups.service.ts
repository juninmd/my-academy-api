import { Injectable } from '@nestjs/common';
import { CreateWorkoutsGroupDto } from './dto/create-workouts-group.dto';
import { UpdateWorkoutsGroupDto } from './dto/update-workouts-group.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class WorkoutsGroupsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: CreateWorkoutsGroupDto) {
    return this.prismaService.workoutsGroups.create({
      data: {
        name: data.name,
        image: data.image,
        user: { connect: { id: data.userId } },
        workouts: {
          create: data.workouts.map((workout) => ({
            exercise: { connect: { id: workout.exerciseId } },
            description: workout.description || '',
            method: { connect: { id: workout.methodId } },
            workoutSeries: {
              create: workout.workoutSeries.map((series) => ({
                repetitions: series.repetitions,
                weight: series.weight,
                rest: series.rest,
              })),
            },
          })),
        },
      },
    });
  }

  findAll(userId: string) {
    return this.prismaService.workoutsGroups.findMany({ where: { userId } });
  }

  findAllExercises(id: number) {
    return this.prismaService.workoutsGroups.findUnique({
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
  }

  findOne(id: number) {
    return this.prismaService.workoutsGroups.findUnique({
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
  }

  async update(id: number, data: UpdateWorkoutsGroupDto) {
    if (data.workouts) {
      await this.prismaService.workouts.deleteMany({
        where: { workoutsGroupsId: id },
      });
    }

    return this.prismaService.workoutsGroups.update({
      where: { id },
      data: {
        name: data.name,
        image: data.image,
        user: data.userId ? { connect: { id: data.userId } } : undefined,
        workouts: data.workouts
          ? {
              create: data.workouts.map((workout) => ({
                exercise: { connect: { id: workout.exerciseId } },
                description: workout.description,
                method: workout.methodId
                  ? { connect: { id: workout.methodId } }
                  : undefined,
                workoutSeries: workout.workoutSeries
                  ? {
                      create: workout.workoutSeries.map((series) => ({
                        repetitions: series.repetitions,
                        weight: series.weight,
                        rest: series.rest,
                      })),
                    }
                  : undefined,
              })),
            }
          : undefined,
      },
      include: {
        workouts: {
          include: {
            workoutSeries: true,
          },
        },
      },
    });
  }
  remove(id: number) {
    return this.prismaService.workoutsGroups.delete({
      where: { id },
      include: { WorkoutSessions: {} },
    });
  }
}
