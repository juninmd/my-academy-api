import { Injectable } from '@nestjs/common';
import { CreateAcademyDto } from './dto/create-academy.dto';
import { UpdateAcademyDto } from './dto/update-academy.dto';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class AcademiesService {
  constructor(private prisma: PrismaService) {}

  create(createAcademyDto: CreateAcademyDto) {
    return this.prisma.academy.create({ data: createAcademyDto });
  }

  findAll() {
    return this.prisma.academy.findMany();
  }

  findOne(id: number) {
    return this.prisma.academy.findUnique({ where: { id } });
  }

  update(id: number, updateAcademyDto: UpdateAcademyDto) {
    return this.prisma.academy.update({ where: { id }, data: updateAcademyDto });
  }

  remove(id: number) {
    return this.prisma.academy.delete({ where: { id } });
  }
}
