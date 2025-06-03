import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma.service';
import { Users } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) { }

  create(createUsersDto: CreateUserDto) {
    return this.prismaService.users.create({ data: createUsersDto as Users });
  }

  findAll() {
    return this.prismaService.users.findMany();
  }

  findOne(id: string) {
    return this.prismaService.users.findUnique({ where: { id } });
  }

  findOneByEmail(email: string) {
    return this.prismaService.users.findFirst({ where: { email } });
  }

  async findUserWithPhysicalAssessments(userId: string) {
    return this.prismaService.users.findUnique({
      where: { id: userId },
      include: { PhysicalAssessments: true },
    });
  }

  async findUserNotifications(userId: string) {
    return this.prismaService.users.findUnique({
      where: { id: userId },
      include: { NotificationsReceived: true, NotificationsSent: true },
    });
  }

  async findUserClassBookings(userId: string) {
    return this.prismaService.users.findUnique({
      where: { id: userId },
      include: { ClassBookings: true },
    });
  }

  update(id: string, updateDto: UpdateUserDto) {
    return this.prismaService.users.update({
      where: { id },
      data: updateDto as Users,
    });
  }

  remove(id: string) {
    return this.prismaService.users.delete({ where: { id } });
  }
}
