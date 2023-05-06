import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePersonalDto } from './dto/create-personal.dto';
import { UpdatePersonalDto } from './dto/update-personal.dto';

@Injectable()
export class PersonalsService {
  constructor(private readonly prismaService: PrismaService) { }

  create(createpersonalsDto: CreatePersonalDto) {
    return this.prismaService.personals.create({ data: createpersonalsDto as Personals });
  }

  findAll() {
    return this.prismaService.personals.findMany();
  }

  findOne(id: number) {
    return this.prismaService.personals.findUnique({ where: { id: Number(id) } })
  }

  update(id: number, updateExerciseDto: UpdateMethodDto) {
    return this.prismaService.personals.update({ where: { id: Number(id) }, data: updateExerciseDto as personals })
  }

  remove(id: number) {
    return this.prismaService.personals.delete({ where: { id: Number(id) } })
  }
}
