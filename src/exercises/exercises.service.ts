import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { PrismaService } from '../prisma.service';
import { Exercise } from './entities/exercise.entity';

@Injectable()
export class ExercisesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    const { name, image, tips, mistakes, type } = createExerciseDto;

    return this.prismaService.exercises.create({
      data: {
        name,
        image,
        tips,
        mistakes,
        type,
      },
    });
  }

  async findAll(): Promise<Exercise[]> {
    return this.prismaService.exercises.findMany();
  }

  async findOne(id: number): Promise<Exercise> {
    const exercise = await this.prismaService.exercises.findUnique({
      where: { id },
    });

    if (!exercise) {
      throw new NotFoundException(`Exercise #${id} not found`);
    }

    return exercise;
  }

  async update(id: number, updateDto: UpdateExerciseDto): Promise<Exercise> {
    await this.findOne(id);

    const { name, image, tips, mistakes, type } = updateDto;

    return this.prismaService.exercises.update({
      where: { id },
      data: {
        name,
        image,
        tips,
        mistakes,
        type,
      },
    });
  }

  async remove(id: number): Promise<Exercise> {
    await this.findOne(id);

    return this.prismaService.exercises.delete({ where: { id } });
  }
}
