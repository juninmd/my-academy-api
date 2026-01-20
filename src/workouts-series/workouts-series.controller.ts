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
import { WorkoutsSeriesService } from './workouts-series.service';
import { CreateWorkoutsSeriesDto } from './dto/create-workouts-series.dto';
import { UpdateWorkoutsSeriesDto } from './dto/update-workouts-series.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { WorkoutSeries } from './entities/workout-series.entity';

@ApiTags('Workouts Series')
@Controller('workouts-series')
export class WorkoutsSeriesController {
  constructor(private readonly workoutsSeriesService: WorkoutsSeriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new workout series' })
  @ApiResponse({
    status: 201,
    description: 'The workout series has been successfully created.',
  })
  create(@Body() createWorkoutsSeriesDto: CreateWorkoutsSeriesDto): Promise<WorkoutSeries> {
    return this.workoutsSeriesService.create(createWorkoutsSeriesDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all workout series' })
  @ApiResponse({ status: 200, description: 'Return all workout series.' })
  findAll(): Promise<WorkoutSeries[]> {
    return this.workoutsSeriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a workout series by id' })
  @ApiResponse({ status: 200, description: 'Return the workout series.' })
  @ApiResponse({ status: 404, description: 'Workout series not found.' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<WorkoutSeries> {
    return this.workoutsSeriesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a workout series' })
  @ApiResponse({
    status: 200,
    description: 'The workout series has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Workout series not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWorkoutsSeriesDto: UpdateWorkoutsSeriesDto,
  ): Promise<WorkoutSeries> {
    return this.workoutsSeriesService.update(id, updateWorkoutsSeriesDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a workout series' })
  @ApiResponse({
    status: 200,
    description: 'The workout series has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Workout series not found.' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<WorkoutSeries> {
    return this.workoutsSeriesService.remove(id);
  }
}
