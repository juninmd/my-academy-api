import { Injectable } from '@nestjs/common';
import { ExercisesSeries } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateExercisesSeriesDto } from './dto/create-exercises-series.dto';
import { UpdateExercisesSeryDto } from './dto/update-exercises-series.dto';

@Injectable()
export class ExercisesSeriesService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createExercisesSeriesDto: CreateExercisesSeriesDto) {
    return this.prismaService.exercisesSeries.create({
      data: createExercisesSeriesDto as ExercisesSeries,
    });
  }

  findAll() {
    return this.prismaService.exercisesSeries.findMany();
  }

  findOne(id: number) {
    return this.prismaService.exercisesSeries.findUnique({
      where: { id: Number(id) },
    });
  }

  update(id: number, updateDto: UpdateExercisesSeryDto) {
    return this.prismaService.exercisesSeries.update({
      where: { id: Number(id) },
      data: updateDto as ExercisesSeries,
    });
  }

  remove(id: number) {
    return this.prismaService.exercisesSeries.delete({
      where: { id: Number(id) },
    });
  }
}
