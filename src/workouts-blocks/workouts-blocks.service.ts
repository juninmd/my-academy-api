import { Injectable } from '@nestjs/common';
import { CreateWorkoutBlockDto } from './dto/create-workout-block.dto';
import { UpdateWorkoutBlockDto } from './dto/update-workout-block.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class WorkoutsBlocksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWorkoutBlockDto: CreateWorkoutBlockDto) {
    const { workoutSeries, ...blockData } = createWorkoutBlockDto;
    const createdBlock = await this.prisma.workoutBlock.create({
      data: blockData,
    });

    if (workoutSeries && workoutSeries.length > 0) {
      await this.prisma.workoutSeries.createMany({
          data: workoutSeries.map((series) => ({
            ...series,
            workoutBlockId: createdBlock.id,
            workoutId: createdBlock.workoutId,
          })),
      });
    }
    return this.prisma.workoutBlock.findUnique({
      where: { id: createdBlock.id },
      include: { workoutSeries: true },
    });
  }

  findAll() {
    return this.prisma.workoutBlock.findMany({
      include: { workoutSeries: true },
    });
  }

  findOne(id: number) {
    return this.prisma.workoutBlock.findUnique({
      where: { id },
      include: { workoutSeries: true },
    });
  }

  async update(id: number, updateWorkoutBlockDto: UpdateWorkoutBlockDto) {
    const { workoutSeries, ...blockData } = updateWorkoutBlockDto;

    // Atualiza o bloco de treino
    const updatedBlock = await this.prisma.workoutBlock.update({
      where: { id },
      data: blockData,
    });

    // Lógica para atualizar workoutSeries:
    // 1. Excluir séries existentes para este bloco
    await this.prisma.workoutSeries.deleteMany({
      where: { workoutBlockId: id },
    });

    // 2. Criar novas séries se fornecidas
    if (workoutSeries && workoutSeries.length > 0) {
      await this.prisma.workoutSeries.createMany({
          data: workoutSeries.map((series) => ({
            ...series,
            workoutBlockId: updatedBlock.id,
            workoutId: updatedBlock.workoutId,
          })),
      });
    }

    return this.prisma.workoutBlock.findUnique({
      where: { id: updatedBlock.id },
      include: { workoutSeries: true },
    });
  }

  remove(id: number) {
    // Primeiro, exclua as workoutSeries associadas
    this.prisma.workoutSeries.deleteMany({ where: { workoutBlockId: id } });
    // Em seguida, exclua o workoutBlock
    return this.prisma.workoutBlock.delete({ where: { id } });
  }
}
