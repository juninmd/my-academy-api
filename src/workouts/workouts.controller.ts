import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Workout } from './entities/workout.entity';

@ApiTags('Workouts')
@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new workout' })
  @ApiResponse({
    status: 201,
    description: 'The workout has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createWorkoutDto: CreateWorkoutDto): Promise<Workout> {
    return this.workoutsService.create(createWorkoutDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all workouts' })
  @ApiResponse({ status: 200, description: 'Return all workouts.' })
  findAll(): Promise<Workout[]> {
    return this.workoutsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a workout by id' })
  @ApiResponse({ status: 200, description: 'Return the workout.' })
  @ApiResponse({ status: 404, description: 'Workout not found.' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Workout> {
    return this.workoutsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a workout' })
  @ApiResponse({
    status: 200,
    description: 'The workout has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Workout not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWorkoutDto: UpdateWorkoutDto,
  ): Promise<Workout> {
    return this.workoutsService.update(id, updateWorkoutDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a workout' })
  @ApiResponse({
    status: 200,
    description: 'The workout has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Workout not found.' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<Workout> {
    return this.workoutsService.remove(id);
  }
}
