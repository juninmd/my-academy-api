import { Injectable } from '@nestjs/common';
import { CreateWorkoutsGroupDto } from './dto/create-workouts-group.dto';
import { UpdateWorkoutsGroupDto } from './dto/update-workouts-group.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class WorkoutsGroupsService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(data: CreateWorkoutsGroupDto) {
    const workoutGroup = await this.prismaService.workoutsGroups.create({
      data: {
        name: data.name,
        image: data.image,
        userId: data.userId,
        workouts: {
          create: data.workouts.map((workout) => ({
            description: workout.description || '',
            method: workout.methodId ? { connect: { id: workout.methodId } } : undefined,
            exercise: { connect: { id: workout.exerciseId } },
          })),
        },
      },
      include: {
        workouts: true, // Inclui os workouts criados para obter seus IDs
      },
    });

    await this._createWorkoutBlocksAndSeries(workoutGroup.workouts, data.workouts);

    return this.prismaService.workoutsGroups.findUnique({
      where: { id: workoutGroup.id },
      include: {
        workouts: {
          include: {
            workoutBlocks: {
              include: {
                workoutSeries: true,
              },
            },
            exercise: true,
            method: true,
          },
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
            workoutBlocks: {
              include: {
                workoutSeries: true,
              },
            },
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
            workoutBlocks: {
              include: {
                workoutSeries: true,
              },
            },
            exercise: true,
            method: true,
          },
        },
      },
    });
  }

  async update(id: number, data: UpdateWorkoutsGroupDto) {
    // 1. Excluir workouts, workoutBlocks e workoutSeries existentes
    await this.prismaService.workoutSeries.deleteMany({
      where: {
        workoutBlock: {
          workout: {
            workoutsGroupsId: id,
          },
        },
      },
    });

    await this.prismaService.workoutBlock.deleteMany({
      where: {
        workout: {
          workoutsGroupsId: id,
        },
      },
    });

    await this.prismaService.workouts.deleteMany({
      where: {
        workoutsGroupsId: id,
      },
    });

    // 2. Atualizar os dados básicos do grupo de treino
    const updatedWorkoutGroup = await this.prismaService.workoutsGroups.update({
      where: { id },
      data: {
        name: data.name,
        image: data.image,
        userId: data.userId,
      },
    });

    // 3. Recriar workouts, workoutBlocks e workoutSeries
    if (data.workouts) {
      const createdWorkouts = await Promise.all(
        data.workouts.map((workoutDto) =>
          this.prismaService.workouts.create({
            data: {
              description: workoutDto.description || '',
              method: workoutDto.methodId ? { connect: { id: workoutDto.methodId } } : undefined,
              exercise: { connect: { id: workoutDto.exerciseId } },
              workoutGroup: { connect: { id: updatedWorkoutGroup.id } },
            },
          }),
        ),
      );

      await this._createWorkoutBlocksAndSeries(createdWorkouts, data.workouts);
    }

    // Retorna o grupo de treino atualizado com as novas relações
    return this.prismaService.workoutsGroups.findUnique({
      where: { id },
      include: {
        workouts: {
          include: {
            workoutBlocks: {
              include: {
                workoutSeries: true,
              },
            },
            exercise: true,
            method: true,
          },
        },
      },
    });
  }
  async remove(id: number) {
    // 1. Excluir workoutSeries associadas aos workouts deste grupo
    await this.prismaService.workoutSeries.deleteMany({
      where: {
        workoutBlock: {
          workout: {
            workoutsGroupsId: id,
          },
        },
      },
    });

    // 2. Excluir workoutBlocks associados aos workouts deste grupo
    await this.prismaService.workoutBlock.deleteMany({
      where: {
        workout: {
          workoutsGroupsId: id,
        },
      },
    });

    // 3. Excluir workouts associados a este grupo
    await this.prismaService.workouts.deleteMany({
      where: {
        workoutsGroupsId: id,
      },
    });

    // 4. Excluir o grupo de treino
    return this.prismaService.workoutsGroups.delete({
      where: { id },
      include: { WorkoutSessions: {} }
    });
  }

  private async _createWorkoutBlocksAndSeries(
    createdWorkouts: any[], // Tipo mais específico seria Workouts[] do Prisma
    workoutDtos: any[], // Tipo mais específico seria CreateWorkoutDto[]
  ) {
    for (let i = 0; i < workoutDtos.length; i++) {
      const workoutDto = workoutDtos[i];
      const createdWorkout = createdWorkouts.find(
        (w) => w.exerciseId === workoutDto.exerciseId && w.description === workoutDto.description,
      );

      if (createdWorkout && workoutDto.workoutBlocks) {
        for (const blockDto of workoutDto.workoutBlocks) {
          const createdBlock = await this.prismaService.workoutBlock.create({
            data: {
              workoutId: createdWorkout.id,
              order: blockDto.order,
            },
          });

          if (blockDto.workoutSeries) {
            await this.prismaService.workoutSeries.createMany({
              data: blockDto.workoutSeries.map((series) => ({
                workoutId: createdWorkout.id,
                workoutBlockId: createdBlock.id,
                repetitions: series.repetitions,
                weight: series.weight,
                rest: series.rest,
              })),
            });
          }
        }
      }
    }
  }
}
