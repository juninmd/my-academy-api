import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePersonalDto } from './dto/create-personal.dto';
import { UpdatePersonalDto } from './dto/update-personal.dto';
import { Personals } from '@prisma/client';

@Injectable()
export class PersonalsService {
  constructor(private readonly prismaService: PrismaService) { }

  create(createpersonalsDto: CreatePersonalDto) {
    return this.prismaService.personals.create({
      data: createpersonalsDto as Personals,
    });
  }

  findAll() {
    return this.prismaService.personals.findMany();
  }

  findOne(id: string) {
    return this.prismaService.personals.findFirst({
      where: { userId: id },
    });
  }

  update(id: number, updateDto: UpdatePersonalDto) {
    return this.prismaService.personals.update({
      where: { id },
      data: updateDto as Personals,
    });
  }

  remove(id: number) {
    return this.prismaService.personals.delete({ where: { id } });
  }
}
