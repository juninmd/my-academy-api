import { Injectable } from '@nestjs/common';
import { Methods } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateMethodDto } from './dto/create-method.dto';
import { UpdateMethodDto } from './dto/update-method.dto';

@Injectable()
export class MethodsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createMethodsDto: CreateMethodDto) {
    return this.prismaService.methods.create({
      data: createMethodsDto as Methods,
    });
  }

  findAll() {
    return this.prismaService.methods.findMany();
  }

  findOne(id: number) {
    return this.prismaService.methods.findUnique({ where: { id: Number(id) } });
  }

  update(id: number, updateDto: UpdateMethodDto) {
    return this.prismaService.methods.update({
      where: { id: Number(id) },
      data: updateDto as Methods,
    });
  }

  remove(id: number) {
    return this.prismaService.methods.delete({ where: { id: Number(id) } });
  }
}
