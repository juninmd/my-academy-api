import { Injectable } from '@nestjs/common';
import { CreateWorkoutsSessionsDto } from './dto/create-workouts-sessions.dto';
import { UpdateWorkoutsSessionsDto } from './dto/update-workouts-sessions.dto';
import { PrismaService } from '../prisma.service';
import { WorkoutSessions } from '@prisma/client';
import { TelegramService } from '../telegram/telegram.service';

@Injectable()
export class WorkoutsSessionsService {
  constructor(private readonly prismaService: PrismaService, private readonly telegramService: TelegramService) { }

  async create(createworkoutsDto: CreateWorkoutsSessionsDto, userId: string) {
    const user = await this.prismaService.users.findUniqueOrThrow({ where: { id: userId } });
    if (user.telegramId) {
      const date = new Date();
      const dateText = `${date.getUTCDate().toString().padStart(2, '0')}/${(date.getUTCMonth() + 1).toString().padStart(2, '0')}/${date.getUTCFullYear()}`;
      const workoutGroup = await this.prismaService.workoutsGroups.findUniqueOrThrow({ where: { id: createworkoutsDto.workoutGroupId } });
      const message = `${dateText} - ${workoutGroup.name}`;
      await this.telegramService.postChannelMessage(message, user.telegramId);
    }

    return this.prismaService.workoutSessions.create({
      data: createworkoutsDto as WorkoutSessions,
    });
  }

  async findAll(userId: string, year: number, month: number) {
    const workoutGroups = await this.prismaService.workoutsGroups.findMany({
      where: {
        userId: userId,
      },
      orderBy: { id: 'asc' },
    });
    const sequencies = await this.prismaService.workoutSessions.findMany({
      where: {
        workoutGroupId: {
          in: workoutGroups.map((x) => x.id),
        },
        date: {
          gte: new Date(year, month - 1, 1),
          lt: new Date(year, month, 1),
        },
      },
      include: {
        workoutsGroups: true,
      },
    });

    return sequencies;
  }

  async findSummary(idUser: string) {
    let students = [];
    let personal = undefined;

    const iAmPersonal = await this.prismaService.personals.findMany({
      where: {
        personalUserId: idUser,
      },
      include: { StudentUser: true },
    });

    if (iAmPersonal.length > 0) {
      students = iAmPersonal.map(q => q.StudentUser).flat(1);
    }

    const iAmStudent = await this.prismaService.personals.findFirst({
      where: {
        personalUserId: idUser,
      },
      include: { PersonalUser: true },
    })

    if (iAmStudent) {
      personal = iAmStudent.PersonalUser;
    }

    const workoutGroups = await this.prismaService.workoutsGroups.findMany({
      where: {
        userId: idUser,
      },
      orderBy: { id: 'asc' },
    });

    const lastSession = await this.prismaService.workoutSessions.findFirst({
      where: {
        workoutGroupId: {
          in: workoutGroups.map((x) => x.id),
        },
      },
      include: { workoutsGroups: true },
      orderBy: { date: 'desc' },
      take: 1,
    });

    const sequencies = await this.prismaService.workoutSessions.findMany({
      where: {
        workoutGroupId: {
          in: workoutGroups.map((x) => x.id),
        },
      },
      orderBy: {
        date: 'asc',
      },
    });

    const currentDate = new Date();

    let workoutGroupOfDay: { id: number };
    if (!lastSession) {
      workoutGroupOfDay = workoutGroups[0];
    } else if (
      lastSession.date.getUTCDate() === currentDate.getUTCDate() &&
      lastSession.date.getUTCMonth() === currentDate.getUTCMonth() &&
      lastSession.date.getUTCFullYear() === currentDate.getUTCFullYear()
    ) {
      workoutGroupOfDay = lastSession.workoutsGroups;
    } else {
      const index =
        workoutGroups.map((x) => x.id).indexOf(lastSession.workoutGroupId) + 1;
      if (index < workoutGroups.length) {
        workoutGroupOfDay = workoutGroups[index];
      } else {
        workoutGroupOfDay = workoutGroups[0];
      }
    }

    const counter = this.calculateSequence(sequencies, currentDate);

    return {
      lastSession,
      counter,
      workoutGroupOfDay,
      students,
      personal,
    };
  }

  calculateSequence(sequences: any[], currentDate: Date): number {
    if (sequences.length === 0) {
      return 0;
    }

    let count = 0;
    let currentSequence = 0;

    for (let i = 0; i < sequences.length; i++) {
      const sequence = new Date(sequences[i].date);
      const currentDayOfWeek = sequence.getUTCDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado

      if (currentDayOfWeek !== 0) {
        // Ignorar registros de Domingo
        if (i === 0) {
          currentSequence++;
        } else {
          const previousDate = new Date(sequences[i - 1].date);
          const diffTime = Math.abs(
            sequence.getTime() - previousDate.getTime(),
          );
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          const canIncrement =
            (previousDate.getUTCDay() === 6 && sequence.getUTCDay() === 1) ||
            diffDays === 1;

          if (canIncrement) {
            currentSequence++;
          } else {
            if (diffDays > 1) {
              currentSequence = 0; // Reinicia a sequência se houver uma lacuna (excluindo os Domingos)
            } else {
              currentSequence = 1; // Inicia uma nova sequência se for o mesmo dia
            }
          }
        }

        if (currentSequence > count) {
          count = currentSequence;
        }
      }
    }

    const lastDate = sequences[sequences.length - 1].date;
    const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const canIncrement =
      (lastDate.getUTCDay() === 6 && currentDate.getUTCDay() === 1) ||
      diffDays === 1;

    if (!canIncrement) {
      count = 0; // Reinicia a sequência se houver uma lacuna (excluindo os Domingos)
    }

    return count;
  }

  getStartDateOfWeek(dayOfWeek: number): Date {
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    const diffDays = (dayOfWeek - currentDayOfWeek + 7) % 7;
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + diffDays,
    );

    return startDate;
  }

  getEndDateOfWeek(dayOfWeek: number): Date {
    const startDate = this.getStartDateOfWeek(dayOfWeek);
    const endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + 1,
    );
    return endDate;
  }

  findOne(id: number) {
    return this.prismaService.workoutSessions.findUnique({
      where: { id },
    });
  }

  update(id: number, updateDto: UpdateWorkoutsSessionsDto) {
    return this.prismaService.workoutSessions.update({
      where: { id },
      data: updateDto as WorkoutSessions,
    });
  }

  remove(id: number) {
    return this.prismaService.workoutSessions.delete({
      where: { id },
    });
  }
}
