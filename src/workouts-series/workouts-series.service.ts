import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateWorkoutsSeriesDto } from './dto/create-workouts-series.dto';
import { UpdateWorkoutsSeriesDto } from './dto/update-workouts-series.dto';
import { WorkoutSeries } from './entities/workout-series.entity';

@Injectable()
export class WorkoutsSeriesService {
  constructor(private readonly prismaService: PrismaService) {}

  create(
    createWorkoutsSeriesDto: CreateWorkoutsSeriesDto,
  ): Promise<WorkoutSeries> {
    const { id: _, ...data } = createWorkoutsSeriesDto;

    if (!data.workoutId) {
      throw new BadRequestException('workoutId is required');
    }

    return this.prismaService.workoutSeries.create({
      data: {
        ...data,
        workoutId: data.workoutId,
      },
    });
  }

  findAll(): Promise<WorkoutSeries[]> {
    return this.prismaService.workoutSeries.findMany();
  }

  async findOne(id: number): Promise<WorkoutSeries> {
    const series = await this.prismaService.workoutSeries.findUnique({
      where: { id },
    });
    if (!series) {
      throw new NotFoundException(`WorkoutSeries #${id} not found`);
    }
    return series;
  }

  async update(
    id: number,
    updateDto: UpdateWorkoutsSeriesDto,
  ): Promise<WorkoutSeries> {
    await this.findOne(id);
    const { id: _, ...data } = updateDto;
    return this.prismaService.workoutSeries.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<WorkoutSeries> {
    await this.findOne(id);
    return this.prismaService.workoutSeries.delete({
      where: { id },
    });
  }
}
