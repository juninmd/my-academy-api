import { Injectable } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { PrismaService } from '../prisma.service';
import { Workouts } from '@prisma/client';

@Injectable()
export class WorkoutsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createworkoutsDto: CreateWorkoutDto) {
    return this.prismaService.workouts.create({
      data: createworkoutsDto as Workouts,
    });
  }

  findAll() {
    return this.prismaService.workouts.findMany();
  }

  findOne(id: number) {
    return this.prismaService.workouts.findUnique({
      where: { id },
    });
  }

  update(id: number, updateDto: UpdateWorkoutDto) {
    return this.prismaService.workouts.update({
      where: { id },
      data: updateDto as any,
    });
  }

  remove(id: number) {
    return this.prismaService.workouts.delete({ where: { id } });
  }
}
