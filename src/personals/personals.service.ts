import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePersonalDto } from './dto/create-personal.dto';
import { UpdatePersonalDto } from './dto/update-personal.dto';

@Injectable()
export class PersonalsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createpersonalsDto: CreatePersonalDto) {
    return this.prismaService.personals.create({
      data: {
        studentUserId: createpersonalsDto.studentUserId,
        personalUserId: createpersonalsDto.personalUserId,
      },
    });
  }

  findAll(personalUserId: string) {
    return this.prismaService.personals.findMany({
      where: {
        personalUserId,
      },
      include: { PersonalUser: true, StudentUser: true },
    });
  }

  async findStudents(personalUserId: string) {
    const personal = await this.prismaService.personals.findMany({
      where: { personalUserId },
      include: { StudentUser: true, PersonalClassSchedule: true },
    });
    return personal
      .map((q) => ({
        student: q.StudentUser,
        schedule: q.PersonalClassSchedule,
      }))
      .flat(1);
  }

  update(id: number, updateDto: UpdatePersonalDto) {
    const { id: _, ...data } = updateDto;
    return this.prismaService.personals.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  remove(id: number) {
    return this.prismaService.personals.delete({ where: { id } });
  }
}
