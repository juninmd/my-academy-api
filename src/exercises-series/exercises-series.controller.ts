import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExercisesSeriesService } from './exercises-series.service';
import { CreateExercisesSeriesDto } from './dto/create-exercises-series.dto';
import { UpdateExercisesSeryDto } from './dto/update-exercises-series.dto';

@Controller('exercises-series')
export class ExercisesSeriesController {
  constructor(
    private readonly exercisesSeriesService: ExercisesSeriesService,
  ) {}

  @Post()
  create(
    @Body()
    createExercisesSerCreateExercisesSeriesDto: CreateExercisesSeriesDto,
  ) {
    return this.exercisesSeriesService.create(
      createExercisesSerCreateExercisesSeriesDto,
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
    @Body() updateExercisesSeryDto: UpdateExercisesSeryDto,
  ) {
    return this.exercisesSeriesService.update(+id, updateExercisesSeryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exercisesSeriesService.remove(+id);
  }
}
