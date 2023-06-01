import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { PrismaService } from '../prisma.service';

import { Exercises } from '@prisma/client';

@Injectable()
export class ExercisesService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createExerciseDto: CreateExerciseDto) {
    return this.prismaService.exercises.create({
      data: createExerciseDto as Exercises,
    });
  }

  findAll() {
    return this.prismaService.exercises.findMany();
  }

  findOne(id: number) {
    return this.prismaService.exercises.findUnique({
      where: { id: Number(id) },
    });
  }

  update(id: number, updateDto: UpdateExerciseDto) {
    return this.prismaService.exercises.update({
      where: { id: Number(id) },
      data: updateDto as Exercises,
    });
  }

  remove(id: number) {
    return this.prismaService.exercises.delete({ where: { id: Number(id) } });
  }
}
