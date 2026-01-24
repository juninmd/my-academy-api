import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateMethodDto } from './dto/create-method.dto';
import { UpdateMethodDto } from './dto/update-method.dto';
import { Method } from './entities/method.entity';

@Injectable()
export class MethodsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createMethodsDto: CreateMethodDto): Promise<Method> {
    const { name, description } = createMethodsDto;
    return this.prismaService.methods.create({
      data: {
        name,
        description,
      },
    });
  }

  async findAll(): Promise<Method[]> {
    return this.prismaService.methods.findMany();
  }

  async findOne(id: number): Promise<Method> {
    const method = await this.prismaService.methods.findUnique({
      where: { id },
    });
    if (!method) {
      throw new NotFoundException(`Method #${id} not found`);
    }
    return method;
  }

  async update(id: number, updateDto: UpdateMethodDto): Promise<Method> {
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

  async remove(id: number): Promise<Method> {
    await this.findOne(id);
    return this.prismaService.methods.delete({ where: { id } });
  }
}
