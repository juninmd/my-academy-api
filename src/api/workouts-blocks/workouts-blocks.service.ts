import { Injectable } from '@nestjs/common';
import { CreateWorkoutBlockDto } from './dto/create-workout-block.dto';
import { UpdateWorkoutBlockDto } from './dto/update-workout-block.dto';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class WorkoutsBlocksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWorkoutBlockDto: CreateWorkoutBlockDto) {
    const { workouts, workoutGroupId, ...blockData } = createWorkoutBlockDto;
    const createdBlock = await this.prisma.workoutsBlocks.create({
      data: {
        workoutGroupId,
        ...blockData,
        workouts: {
          create: workouts?.map((workout) => ({
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
      include: {
        workouts: {
          include: {
            workoutSeries: true,
          },
        },
      },
    });
    return createdBlock;
  }

  findAll() {
    return this.prisma.workoutsBlocks.findMany({
      include: {
        workouts: {
          include: {
            workoutSeries: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.workoutsBlocks.findUnique({
      where: { id },
      include: {
        workouts: {
          include: {
            workoutSeries: true,
          },
        },
      },
    });
  }

  async update(id: number, updateWorkoutBlockDto: UpdateWorkoutBlockDto) {
    const { workouts, workoutGroupId, ...blockData } = updateWorkoutBlockDto;

    // Atualiza o bloco de treino
    const updatedBlock = await this.prisma.workoutsBlocks.update({
      where: { id },
      data: {
        workoutGroupId,
        ...blockData,
      },
    });

    // Lógica para atualizar Workouts e WorkoutSeries:
    // 1. Obter todos os Workouts existentes para este bloco
    const existingWorkouts = await this.prisma.workouts.findMany({
      where: { workoutsBlocksId: id },
      select: { id: true },
    });

    // 2. Excluir todas as WorkoutSeries associadas aos Workouts existentes
    if (existingWorkouts.length > 0) {
      await this.prisma.workoutSeries.deleteMany({
        where: {
          workoutId: {
            in: existingWorkouts.map((w) => w.id),
          },
        },
      });
    }

    // 3. Excluir todos os Workouts existentes para este bloco
    await this.prisma.workouts.deleteMany({
      where: { workoutsBlocksId: id },
    });

    // 4. Criar novos Workouts e suas WorkoutSeries se fornecidos
    if (workouts && workouts.length > 0) {
      await this.prisma.workouts.createMany({
        data: workouts.map((workout) => ({
          exerciseId: workout.exerciseId,
          description: workout.description,
          methodId: workout.methodId,
          workoutsBlocksId: updatedBlock.id, // Link para o bloco atualizado
        })),
      });

      // Após criar os Workouts, precisamos criar as WorkoutSeries para cada um.
      // Isso requer uma segunda passagem ou uma abordagem mais complexa se não puder ser aninhado diretamente.
      // Para simplificar, vamos buscar os Workouts recém-criados e então criar as séries.
      const newlyCreatedWorkouts = await this.prisma.workouts.findMany({
        where: { workoutsBlocksId: updatedBlock.id },
        select: { id: true, exerciseId: true, description: true, methodId: true }, // Incluir campos para mapeamento
      });

      for (const workoutDto of workouts) {
        const matchingNewWorkout = newlyCreatedWorkouts.find(
          (nw) =>
            nw.exerciseId === workoutDto.exerciseId &&
            nw.description === workoutDto.description &&
            nw.methodId === workoutDto.methodId,
        );

        if (matchingNewWorkout && workoutDto.workoutSeries && workoutDto.workoutSeries.length > 0) {
          await this.prisma.workoutSeries.createMany({
            data: workoutDto.workoutSeries.map((series) => ({
              repetitions: series.repetitions,
              weight: series.weight,
              rest: series.rest,
              workoutId: matchingNewWorkout.id, // Link para o Workout recém-criado
            })),
          });
        }
      }
    }

    return this.prisma.workoutsBlocks.findUnique({
      where: { id: updatedBlock.id },
      include: {
        workouts: {
          include: {
            workoutSeries: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    // 1. Obter todos os Workouts associados a este bloco
    const existingWorkouts = await this.prisma.workouts.findMany({
      where: { workoutsBlocksId: id },
      select: { id: true },
    });

    // 2. Excluir todas as WorkoutSeries associadas aos Workouts existentes
    if (existingWorkouts.length > 0) {
      await this.prisma.workoutSeries.deleteMany({
        where: {
          workoutId: {
            in: existingWorkouts.map((w) => w.id),
          },
        },
      });
    }

    // 3. Excluir todos os Workouts associados a este bloco
    await this.prisma.workouts.deleteMany({
      where: { workoutsBlocksId: id },
    });

    // 4. Finalmente, exclua o workoutsBlocks
    return this.prisma.workoutsBlocks.delete({ where: { id } });
  }
}
