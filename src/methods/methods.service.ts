import { Injectable, NotFoundException } from '@nestjs/common';
import { Methods } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateMethodDto } from './dto/create-method.dto';
import { UpdateMethodDto } from './dto/update-method.dto';

@Injectable()
export class MethodsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createMethodsDto: CreateMethodDto): Promise<Methods> {
    const { name, description } = createMethodsDto;
    return this.prismaService.methods.create({
      data: {
        name,
        description,
      },
    });
  }

  findAll(): Promise<Methods[]> {
    return this.prismaService.methods.findMany();
  }

  async findOne(id: number): Promise<Methods> {
    const method = await this.prismaService.methods.findUnique({
      where: { id },
    });
    if (!method) {
      throw new NotFoundException(`Method #${id} not found`);
    }
    return method;
  }

  async update(id: number, updateDto: UpdateMethodDto): Promise<Methods> {
    await this.findOne(id);
    const { name, description } = updateDto;
    return this.prismaService.methods.update({
      where: { id },
      data: {
        name,
        description,
      },
    });
  }

  async remove(id: number): Promise<Methods> {
    await this.findOne(id);
    return this.prismaService.methods.delete({ where: { id } });
  }
}
