import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Exercise } from './entities/exercise.entity';

@ApiTags('Exercises')
@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new exercise' })
  @ApiResponse({
    status: 201,
    description: 'The exercise has been successfully created.',
    type: Exercise,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    return this.exercisesService.create(createExerciseDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60)
  @ApiOperation({ summary: 'List all exercises' })
  @ApiResponse({
    status: 200,
    description: 'Return all exercises.',
    type: [Exercise],
  })
  findAll(): Promise<Exercise[]> {
    return this.exercisesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an exercise by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the exercise.',
    type: Exercise,
  })
  @ApiResponse({ status: 404, description: 'Exercise not found.' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Exercise> {
    return this.exercisesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an exercise' })
  @ApiResponse({
    status: 200,
    description: 'The exercise has been successfully updated.',
    type: Exercise,
  })
  @ApiResponse({ status: 404, description: 'Exercise not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateExerciseDto,
  ): Promise<Exercise> {
    return this.exercisesService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an exercise' })
  @ApiResponse({
    status: 200,
    description: 'The exercise has been successfully deleted.',
    type: Exercise,
  })
  @ApiResponse({ status: 404, description: 'Exercise not found.' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<Exercise> {
    return this.exercisesService.remove(id);
  }
}
