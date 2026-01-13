import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateWorkoutsSeriesDto } from './dto/create-workouts-series.dto';
import { UpdateWorkoutsSeriesDto } from './dto/update-workouts-series.dto';

@Injectable()
export class WorkoutsSeriesService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createWorkoutsSeriesDto: CreateWorkoutsSeriesDto) {
    return this.prismaService.workoutSeries.create({
      data: createWorkoutsSeriesDto,
    });
  }

  findAll() {
    return this.prismaService.workoutSeries.findMany();
  }

  findOne(id: number) {
    return this.prismaService.workoutSeries.findUnique({
      where: { id },
    });
  }

  update(id: number, updateDto: UpdateWorkoutsSeriesDto) {
    return this.prismaService.workoutSeries.update({
      where: { id },
      data: updateDto,
    });
  }

  remove(id: number) {
    return this.prismaService.workoutSeries.delete({
      where: { id },
    });
  }
}
