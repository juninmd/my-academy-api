import { Injectable } from '@nestjs/common';
import { ExercisesSeries } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateExercisesSeryDto } from './dto/create-exercises-sery.dto';
import { UpdateExercisesSeryDto } from './dto/update-exercises-sery.dto';

@Injectable()
export class ExercisesSeriesService {
  constructor(private readonly prismaService: PrismaService) { }

  create(createExercisesSeryDto: CreateExercisesSeryDto) {
    return this.prismaService.exercisesSeries.create({ data: createExercisesSeryDto as ExercisesSeries });
  }

  findAll() {
    return this.prismaService.exercisesSeries.findMany();
  }

  findOne(id: number) {
    return this.prismaService.exercisesSeries.findUnique({ where: { id: Number(id) } })
  }

  update(id: number, updateExerciseDto: UpdateExercisesSeryDto) {
    return this.prismaService.exercisesSeries.update({ where: { id: Number(id) }, data: updateExerciseDto as ExercisesSeries })
  }

  remove(id: number) {
    return this.prismaService.exercisesSeries.delete({ where: { id: Number(id) } })
  }
}
