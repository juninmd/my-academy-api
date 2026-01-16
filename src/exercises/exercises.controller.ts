import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Exercises')
@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new exercise' })
  @ApiResponse({
    status: 201,
    description: 'The exercise has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createExerciseDto: CreateExerciseDto) {
    return this.exercisesService.create(createExerciseDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60)
  @ApiOperation({ summary: 'List all exercises' })
  @ApiResponse({ status: 200, description: 'Return all exercises.' })
  findAll() {
    return this.exercisesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an exercise by id' })
  @ApiResponse({ status: 200, description: 'Return the exercise.' })
  @ApiResponse({ status: 404, description: 'Exercise not found.' })
  findOne(@Param('id') id: string) {
    return this.exercisesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an exercise' })
  @ApiResponse({
    status: 200,
    description: 'The exercise has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Exercise not found.' })
  update(@Param('id') id: string, @Body() updateDto: UpdateExerciseDto) {
    return this.exercisesService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an exercise' })
  @ApiResponse({
    status: 200,
    description: 'The exercise has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Exercise not found.' })
  remove(@Param('id') id: string) {
    return this.exercisesService.remove(+id);
  }
}
