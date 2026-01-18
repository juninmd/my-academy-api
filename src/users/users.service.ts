import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';
import { Users } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUsersDto: CreateUserDto): Promise<Users> {
    const existing = await this.prismaService.users.findUnique({
      where: { id: createUsersDto.id },
    });

    if (existing) {
      throw new ConflictException('User already exists');
    }

    const { id, name, email, photoUrl, telegramId } = createUsersDto;

    return this.prismaService.users.create({
      data: {
        id,
        name,
        email,
        photoUrl,
        telegramId,
      },
    });
  }

  findAll(): Promise<Users[]> {
    return this.prismaService.users.findMany();
  }

  async findOne(id: string): Promise<Users> {
    const user = await this.prismaService.users.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async update(id: string, updateDto: UpdateUserDto): Promise<Users> {
    await this.findOne(id);

    const { name, email, photoUrl, telegramId } = updateDto;

    return this.prismaService.users.update({
      where: { id },
      data: {
        name,
        email,
        photoUrl,
        telegramId,
      },
    });
  }

  async remove(id: string): Promise<Users> {
    await this.findOne(id);

    return this.prismaService.users.delete({ where: { id } });
  }
}
