import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUsersDto: CreateUserDto): Promise<User> {
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

  async findAll(email?: string): Promise<User[]> {
    if (email) {
      return this.prismaService.users.findMany({ where: { email } });
    }
    return this.prismaService.users.findMany();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prismaService.users.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async update(id: string, updateDto: UpdateUserDto): Promise<User> {
    const { name, email, photoUrl, telegramId } = updateDto;

    try {
      return await this.prismaService.users.update({
        where: { id },
        data: {
          name,
          email,
          photoUrl,
          telegramId,
        },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User #${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: string): Promise<User> {
    try {
      return await this.prismaService.users.delete({ where: { id } });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User #${id} not found`);
      }
      throw error;
    }
  }
}
