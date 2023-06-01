import { Injectable } from '@nestjs/common';
import { CreateWorkoutsGroupDto } from './dto/create-workouts-group.dto';
import { UpdateWorkoutsGroupDto } from './dto/update-workouts-group.dto';
import { WorkoutsGroups } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class WorkoutsGroupsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createworkoutsDto: CreateWorkoutsGroupDto) {
    return this.prismaService.workoutsGroups.create({
      data: createworkoutsDto as WorkoutsGroups,
    });
  }

  findAll() {
    return this.prismaService.workoutsGroups.findMany();
  }

  findOne(id: number) {
    return this.prismaService.workoutsGroups.findUnique({
      where: { id: Number(id) },
    });
  }

  update(id: number, updateDto: UpdateWorkoutsGroupDto) {
    return this.prismaService.workoutsGroups.update({
      where: { id: Number(id) },
      data: updateDto as WorkoutsGroups,
    });
  }

  remove(id: number) {
    return this.prismaService.workoutsGroups.delete({
      where: { id: Number(id) },
    });
  }
}
