import { Injectable } from '@nestjs/common';
import { CreateWorkoutsPersonalsSessionDto } from './dto/create-workouts-personals-session.dto';
import { UpdateWorkoutsPersonalsSessionDto } from './dto/update-workouts-personals-session.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class WorkoutsPersonalsSessionsService {
  constructor(private readonly prismaService: PrismaService) { }

  create(createWorkoutsPersonalsSessionDto: CreateWorkoutsPersonalsSessionDto) {
    return this.prismaService.workoutPersonalSessions.create({
      data: createWorkoutsPersonalsSessionDto,
    });
  }

  findAll() {
    return this.prismaService.workoutPersonalSessions.findMany();
  }

  findOne(id: number) {
    return this.prismaService.workoutPersonalSessions.findUnique({
      where: { id },
    });
  }

  update(id: number, updateDto: UpdateWorkoutsPersonalsSessionDto) {
    return this.prismaService.workoutPersonalSessions.update({
      where: { id },
      data: updateDto,
    });
  }

  remove(id: number) {
    return this.prismaService.workoutPersonalSessions.delete({
      where: { id },
    });
  }

  async findStudents(idUserPersonal: string) {
    const { id: idPersonal } = await this.prismaService.personals.findFirst({
      where: { userId: idUserPersonal },
    });

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Define a hora para 00:00:00.000 do dia atual

    return this.prismaService.workoutPersonalSessions.findMany({
      where: {
        personalsId: idPersonal,
        date: { gte: currentDate, lte: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000) }
      },
      include: { users: true }
    });

  }
}
