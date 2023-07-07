import { Injectable } from '@nestjs/common';
import { CreateWorkoutsPersonalsSessionDto } from './dto/create-workouts-personals-session.dto';
import { UpdateWorkoutsPersonalsSessionDto } from './dto/update-workouts-personals-session.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class WorkoutsPersonalsSessionsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createWorkoutsPersonalsSessionDto: CreateWorkoutsPersonalsSessionDto) {
    return this.prismaService.workoutPeronalSessions.create({
      data: createWorkoutsPersonalsSessionDto,
    });
  }

  findAll() {
    return this.prismaService.workoutPeronalSessions.findMany();
  }

  findOne(id: number) {
    return this.prismaService.workoutPeronalSessions.findUnique({
      where: { id: Number(id) },
    });
  }

  update(id: number, updateDto: UpdateWorkoutsPersonalsSessionDto) {
    return this.prismaService.workoutPeronalSessions.update({
      where: { id: Number(id) },
      data: updateDto,
    });
  }

  remove(id: number) {
    return this.prismaService.workoutPeronalSessions.delete({
      where: { id: Number(id) },
    });
  }
}
