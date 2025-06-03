import { Injectable } from '@nestjs/common';
import { CreateWorkoutsGroupDto } from './dto/create-workouts-group.dto';
import { UpdateWorkoutsGroupDto } from './dto/update-workouts-group.dto';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class WorkoutsGroupsService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(data: CreateWorkoutsGroupDto) {
    const { workoutsBlocks, ...groupData } = data;
    const createdGroup = await this.prismaService.workoutsGroups.create({
      data: {
        ...groupData,
        workoutsBlocks: { // Alterado para workoutsBlocks (singular)
          create: workoutsBlocks?.map((block) => ({
            order: block.order,
            workouts: {
              create: block.workouts?.map((workout) => ({
                exerciseId: workout.exerciseId,
                description: workout.description,
                methodId: workout.methodId,
                workoutSeries: {
                  create: workout.workoutSeries?.map((series) => ({
                    repetitions: series.repetitions,
                    weight: series.weight,
                    rest: series.rest,
                  })),
                },
              })),
            },
          })),
        },
      },
      include: {
        workoutsBlocks: { // Alterado para workoutsBlocks (singular)
          include: {
            workouts: {
              include: {
                workoutSeries: true,
                exercise: true,
                method: true,
              },
            },
          },
        },
      },
    });
    return createdGroup;
  }

  findAll(userId: string) {
    return this.prismaService.workoutsGroups.findMany({
      where: { userId },
      include: {
        workoutsBlocks: { // Alterado para workoutsBlocks (singular)
          include: {
            workouts: {
              include: {
                workoutSeries: true,
                exercise: true,
                method: true,
              },
            },
          },
        },
      },
    });
  }

  findAllExercises(id: number) {
    return this.prismaService.workoutsGroups.findUnique({
      where: { id },
      include: {
        workoutsBlocks: { // Alterado para workoutsBlocks (singular)
          include: {
            workouts: {
              include: {
                workoutSeries: true,
                exercise: true,
                method: true,
              },
            },
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.workoutsGroups.findUnique({
      where: { id },
      include: {
        workoutsBlocks: { // Alterado para workoutsBlocks (singular)
          include: {
            workouts: {
              include: {
                workoutSeries: true,
                exercise: true,
                method: true,
              },
            },
          },
        },
      },
    });
  }

  async update(id: number, data: UpdateWorkoutsGroupDto) {
    const { workoutsBlocks, ...groupData } = data; // Alterado para workoutsBlocks (singular)

    // 1. Atualizar os dados básicos do grupo de treino
    const updatedWorkoutGroup = await this.prismaService.workoutsGroups.update({
      where: { id },
      data: groupData,
    });

    // 2. Excluir WorkoutsBlocks, Workouts e WorkoutSeries existentes para este grupo
    const existingworkoutsBlocks = await this.prismaService.workoutsBlocks.findMany({
      where: { workoutGroupId: id },
      select: { id: true, workouts: { select: { id: true } } },
    });

    for (const block of existingworkoutsBlocks) {
      for (const workout of block.workouts) {
        await this.prismaService.workoutSeries.deleteMany({
          where: { workoutId: workout.id },
        });
      }
      await this.prismaService.workouts.deleteMany({
        where: { workoutsBlocksId: block.id },
      });
    }
    await this.prismaService.workoutsBlocks.deleteMany({
      where: { workoutGroupId: id },
    });

    // 3. Recriar WorkoutsBlocks, Workouts e WorkoutSeries se fornecidos
    if (workoutsBlocks && workoutsBlocks.length > 0) {
      for (const blockDto of workoutsBlocks) {
        await this.prismaService.workoutsBlocks.create({
          data: {
            order: blockDto.order,
            workoutGroupId: updatedWorkoutGroup.id,
            workouts: {
              create: blockDto.workouts?.map((workout) => ({
                exerciseId: workout.exerciseId,
                description: workout.description,
                methodId: workout.methodId,
                workoutSeries: {
                  create: workout.workoutSeries?.map((series) => ({
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
    }

    // Retorna o grupo de treino atualizado com as novas relações
    return this.prismaService.workoutsGroups.findUnique({
      where: { id },
      include: {
        workoutsBlocks: { // Alterado para workoutsBlocks (singular)
          include: {
            workouts: {
              include: {
                workoutSeries: true,
                exercise: true,
                method: true,
              },
            },
          },
        },
      },
    });
  }

  async remove(id: number) {
    // 1. Obter todos os WorkoutsBlocks associados a este grupo
    const existingworkoutsBlocks = await this.prismaService.workoutsBlocks.findMany({
      where: { workoutGroupId: id },
      select: { id: true, workouts: { select: { id: true } } },
    });

    // 2. Excluir todas as WorkoutSeries e Workouts associadas
    for (const block of existingworkoutsBlocks) {
      for (const workout of block.workouts) {
        await this.prismaService.workoutSeries.deleteMany({
          where: { workoutId: workout.id },
        });
      }
      await this.prismaService.workouts.deleteMany({
        where: { workoutsBlocksId: block.id },
      });
    }

    // 3. Excluir todos os WorkoutsBlocks associados a este grupo
    await this.prismaService.workoutsBlocks.deleteMany({
      where: { workoutGroupId: id },
    });

    // 4. Excluir o grupo de treino
    return this.prismaService.workoutsGroups.delete({
      where: { id },
      include: { workoutGroupSession: {} }, // Corrigido para camelCase
    });
  }

  // Este método não é mais necessário se a criação aninhada for usada corretamente
  // private async _createworkoutsBlocksAndSeries(
  //   createdWorkouts: any[],
  //   workoutDtos: any[],
  // ) {
  //   // Lógica de criação aninhada movida para os métodos create e update
  // }
}
