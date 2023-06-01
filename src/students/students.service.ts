import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from '../prisma.service';
import { Students } from '@prisma/client';

@Injectable()
export class StudentsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createstudentsDto: CreateStudentDto) {
    return this.prismaService.students.create({
      data: createstudentsDto as Students,
    });
  }

  findAll() {
    return this.prismaService.students.findMany();
  }

  findOne(id: number) {
    return this.prismaService.students.findUnique({
      where: { id: Number(id) },
    });
  }

  update(id: number, updateDto: UpdateStudentDto) {
    return this.prismaService.students.update({
      where: { id: Number(id) },
      data: updateDto as Students,
    });
  }

  remove(id: number) {
    return this.prismaService.students.delete({ where: { id: Number(id) } });
  }
}
