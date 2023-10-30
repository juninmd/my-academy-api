import { Injectable } from '@nestjs/common';
import { CreateWorkoutsGroupDto } from './dto/create-workouts-group.dto';
import { UpdateWorkoutsGroupDto } from './dto/update-workouts-group.dto';
import { WorkoutsGroups } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class WorkoutsGroupsService {
  constructor(private readonly prismaService: PrismaService) { }

  create(data: CreateWorkoutsGroupDto) {
    return this.prismaService.workoutsGroups.create({
      data: {
        name: data.name,
        description: data.description,
        image: data.image,
        dateStart: data.dateStart,
        dateEnd: data.dateEnd,
        level: data.level,
        userId: data.userId, // Use connect here
        workouts: {
          create: data.workouts.map((workout) => ({
            exerciseId: workout.exerciseId, // Use connect here
            description: workout.description,
            methodId: workout.methodId,
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
      include: {
        workouts: {
          include: {
            workoutSeries: true,
          },
        },
      },
    });
  }

  findAll(userId: number, activated: boolean) {
    return this.prismaService.workoutsGroups.findMany({ where: { userId, activated } });
  }

  findAllExercises(id: number) {
    return this.prismaService.workoutsGroups.findUnique({
      where: { id: Number(id) },
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
      where: { id: Number(id) },
    });
  }

  update(id: number, updateDto: UpdateWorkoutsGroupDto) {
    return this.prismaService.workoutsGroups.update({
      where: { id: Number(id) },
      data: updateDto as WorkoutsGroups,
    });
  }

  remove(id: number) {
    return this.prismaService.workoutsGroups.delete({
      where: { id: Number(id) },
    });
  }

  async disable(id: number) {
    try {
      return await this.prismaService.workoutsGroups.update({
        where: { id: Number(id) },
        data: { activated: false }
      });
    } catch (error) {
      throw error;
    }
  }
}
