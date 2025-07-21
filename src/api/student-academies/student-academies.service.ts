import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateStudentAcademyDto } from './dto/create-student-academy.dto';
import { UpdateStudentAcademyDto } from './dto/update-student-academy.dto';

@Injectable()
export class StudentAcademiesService {
  constructor(private prisma: PrismaService) {}

  create(createStudentAcademyDto: CreateStudentAcademyDto) {
    return this.prisma.studentAcademy.create({ data: createStudentAcademyDto });
  }

  findAll() {
    return this.prisma.studentAcademy.findMany();
  }

  findOne(studentId: string, academyId: number) {
    return this.prisma.studentAcademy.findUnique({
      where: { studentId_academyId: { studentId, academyId } },
    });
  }

  update(studentId: string, academyId: number, updateStudentAcademyDto: UpdateStudentAcademyDto) {
    return this.prisma.studentAcademy.update({
      where: { studentId_academyId: { studentId, academyId } },
      data: updateStudentAcademyDto,
    });
  }

  remove(studentId: string, academyId: number) {
    return this.prisma.studentAcademy.delete({
      where: { studentId_academyId: { studentId, academyId } },
    });
  }
}
