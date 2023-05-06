import { Injectable } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { PrismaService } from '../prisma.service';
import { Workouts } from '@prisma/client';

@Injectable()
export class WorkoutsService {
  constructor(private readonly prismaService: PrismaService) { }

  create(createworkoutsDto: CreateWorkoutDto) {
    return this.prismaService.workouts.create({ data: createworkoutsDto as Workouts });
  }

  findAll() {
    return this.prismaService.workouts.findMany();
  }

  findOne(id: number) {
    return this.prismaService.workouts.findUnique({ where: { id: Number(id) } })
  }

  update(id: number, updateExerciseDto: UpdateWorkoutDto) {
    return this.prismaService.workouts.update({ where: { id: Number(id) }, data: updateExerciseDto as Workouts })
  }

  remove(id: number) {
    return this.prismaService.workouts.delete({ where: { id: Number(id) } })
  }
}
