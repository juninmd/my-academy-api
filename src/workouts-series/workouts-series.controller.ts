import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WorkoutsSeriesService } from './workouts-series.service';
import { CreateWorkoutsSeriesDto } from './dto/create-workouts-series.dto';
import { UpdateExercisesSeriesDto } from './dto/update-workouts-series.dto';

@Controller('workouts-series')
export class WorkoutsSeriesController {
  constructor(
    private readonly exercisesSeriesService: WorkoutsSeriesService,
  ) { }

  @Post()
  create(
    @Body()
    createExercisesSerCreateWorkoutsSeriesDto: CreateWorkoutsSeriesDto,
  ) {
    return this.exercisesSeriesService.create(
      createExercisesSerCreateWorkoutsSeriesDto,
    );
  }

  @Get()
  findAll() {
    return this.exercisesSeriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exercisesSeriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExercisesSeriesDto: UpdateExercisesSeriesDto,
  ) {
    return this.exercisesSeriesService.update(+id, updateExercisesSeriesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exercisesSeriesService.remove(+id);
  }
}
