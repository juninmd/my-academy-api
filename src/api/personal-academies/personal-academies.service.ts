import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreatePersonalAcademyDto } from './dto/create-personal-academy.dto';
import { UpdatePersonalAcademyDto } from './dto/update-personal-academy.dto';

@Injectable()
export class PersonalAcademiesService {
  constructor(private prisma: PrismaService) {}

  create(createPersonalAcademyDto: CreatePersonalAcademyDto) {
    return this.prisma.personalAcademy.create({ data: createPersonalAcademyDto });
  }

  findAll() {
    return this.prisma.personalAcademy.findMany();
  }

  findOne(personalId: string, academyId: number) {
    return this.prisma.personalAcademy.findUnique({
      where: { personalId_academyId: { personalId, academyId } },
    });
  }

  update(personalId: string, academyId: number, updatePersonalAcademyDto: UpdatePersonalAcademyDto) {
    return this.prisma.personalAcademy.update({
      where: { personalId_academyId: { personalId, academyId } },
      data: updatePersonalAcademyDto,
    });
  }

  remove(personalId: string, academyId: number) {
    return this.prisma.personalAcademy.delete({
      where: { personalId_academyId: { personalId, academyId } },
    });
  }
}
