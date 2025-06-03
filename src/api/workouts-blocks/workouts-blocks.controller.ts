import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkoutsBlocksService } from './workouts-blocks.service';
import { CreateWorkoutBlockDto } from './dto/create-workout-block.dto';
import { UpdateWorkoutBlockDto } from './dto/update-workout-block.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('workouts-blocks')
@Controller('workouts-blocks')
export class WorkoutsBlocksController {
  constructor(private readonly workoutsBlocksService: WorkoutsBlocksService) {}

  @Post()
  create(@Body() createWorkoutBlockDto: CreateWorkoutBlockDto) {
    return this.workoutsBlocksService.create(createWorkoutBlockDto);
  }

  @Get()
  findAll() {
    return this.workoutsBlocksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workoutsBlocksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkoutBlockDto: UpdateWorkoutBlockDto) {
    return this.workoutsBlocksService.update(+id, updateWorkoutBlockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutsBlocksService.remove(+id);
  }
}
