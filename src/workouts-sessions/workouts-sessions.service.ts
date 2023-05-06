import { Injectable } from '@nestjs/common';
import { CreateWorkoutsSessionsDto } from './dto/create-workouts-sessions.dto';
import { UpdateWorkoutsSessionsDto } from './dto/update-workouts-sessions.dto';
import { PrismaService } from '../prisma.service';
import { WorkoutSessions } from '@prisma/client';

@Injectable()
export class WorkoutsSessionsService {
  constructor(private readonly prismaService: PrismaService) { }

  create(createworkoutsDto: CreateWorkoutsSessionsDto) {
    return this.prismaService.workoutSessions.create({ data: createworkoutsDto as WorkoutSessions });
  }

  findAll() {
    return this.prismaService.workoutSessions.findMany();
  }

  findOne(id: number) {
    return this.prismaService.workoutSessions.findUnique({ where: { id: Number(id) } })
  }

  update(id: number, updateExerciseDto: UpdateWorkoutsSessionsDto) {
    return this.prismaService.workoutSessions.update({ where: { id: Number(id) }, data: updateExerciseDto as WorkoutSessions })
  }

  remove(id: number) {
    return this.prismaService.workoutSessions.delete({ where: { id: Number(id) } })
  }
}
