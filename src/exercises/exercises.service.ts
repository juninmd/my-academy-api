import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ExercisesService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createExerciseDto: CreateExerciseDto) {
    return this.prismaService.exercises.create({
      data: createExerciseDto,
    });
  }

  findAll() {
    return this.prismaService.exercises.findMany();
  }

  async findOne(id: number) {
    const exercise = await this.prismaService.exercises.findUnique({
      where: { id },
    });

    if (!exercise) {
      throw new NotFoundException(`Exercise #${id} not found`);
    }

    return exercise;
  }

  async update(id: number, updateDto: UpdateExerciseDto) {
    await this.findOne(id);

    return this.prismaService.exercises.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prismaService.exercises.delete({ where: { id } });
  }
}
