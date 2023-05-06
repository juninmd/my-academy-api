import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkoutsCategoriesService } from './workouts-categories.service';
import { CreateWorkoutsCategoryDto } from './dto/create-workouts-category.dto';
import { UpdateWorkoutsCategoryDto } from './dto/update-workouts-category.dto';

@Controller('workouts-categories')
export class WorkoutsCategoriesController {
  constructor(private readonly workoutsCategoriesService: WorkoutsCategoriesService) {}

  @Post()
  create(@Body() createWorkoutsCategoryDto: CreateWorkoutsCategoryDto) {
    return this.workoutsCategoriesService.create(createWorkoutsCategoryDto);
  }

  @Get()
  findAll() {
    return this.workoutsCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workoutsCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkoutsCategoryDto: UpdateWorkoutsCategoryDto) {
    return this.workoutsCategoriesService.update(+id, updateWorkoutsCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutsCategoriesService.remove(+id);
  }
}
