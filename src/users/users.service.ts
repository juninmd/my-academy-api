import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUsersDto: CreateUserDto) {
    const existing = await this.prismaService.users.findUnique({
      where: { id: createUsersDto.id },
    });

    if (existing) {
      throw new ConflictException('User already exists');
    }

    return this.prismaService.users.create({ data: createUsersDto });
  }

  findAll() {
    return this.prismaService.users.findMany();
  }

  async findOne(id: string) {
    const user = await this.prismaService.users.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async update(id: string, updateDto: UpdateUserDto) {
    await this.findOne(id);

    return this.prismaService.users.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prismaService.users.delete({ where: { id } });
  }
}
