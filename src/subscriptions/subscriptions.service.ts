import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}

  create(createSubscriptionDto: CreateSubscriptionDto) {
    return this.prisma.subscription.create({ data: createSubscriptionDto });
  }

  findAll() {
    return this.prisma.subscription.findMany({
      include: { user: true },
    });
  }

  findOne(id: number) {
    return this.prisma.subscription.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    return this.prisma.subscription.update({
      where: { id },
      data: updateSubscriptionDto,
    });
  }

  remove(id: number) {
    return this.prisma.subscription.delete({ where: { id } });
  }

  findByUserId(userId: string) {
    return this.prisma.subscription.findMany({
      where: { userId },
      include: { user: true },
    });
  }
}
