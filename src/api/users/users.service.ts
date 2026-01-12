import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma.service';
import { Users } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    const { role, ...userData } = createUserDto;

    // Create user first
    const user = await this.prismaService.users.create({
      data: userData as Users
    });

    if (role) {
      // Find role by name
      const roleRecord = await this.prismaService.roleUser.findUnique({
        where: { name: role as any } // Assuming role string matches RoleName enum
      });

      if (roleRecord) {
        await this.prismaService.userRole.create({
          data: {
            userId: user.id,
            roleId: roleRecord.id
          }
        });
      }
    } else {
      // Default to STUDENT if no role provided?
      // For now, let's just leave it optional or ensure frontend always sends it.
      // It seems safer to verify if a default role is needed.
      // Let's assume frontend sends it for now.
    }

    return user;
  }

  findAll() {
    return this.prismaService.users.findMany();
  }

  findOne(id: string) {
    return this.prismaService.users.findUnique({
      where: { id },
      include: {
        roles: {
          include: {
            roleUser: true
          }
        }
      }
    });
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
