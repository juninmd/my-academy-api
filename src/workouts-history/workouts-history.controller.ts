import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkoutsHistoryService } from './workouts-history.service';
import { CreateWorkoutsHistoryDto } from './dto/create-workouts-history.dto';
import { UpdateWorkoutsHistoryDto } from './dto/update-workouts-history.dto';

@Controller('workouts-history')
export class WorkoutsHistoryController {
  constructor(private readonly workoutsHistoryService: WorkoutsHistoryService) {}

  @Post()
  create(@Body() createWorkoutsHistoryDto: CreateWorkoutsHistoryDto) {
    return this.workoutsHistoryService.create(createWorkoutsHistoryDto);
  }

  @Get()
  findAll() {
    return this.workoutsHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workoutsHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkoutsHistoryDto: UpdateWorkoutsHistoryDto) {
    return this.workoutsHistoryService.update(+id, updateWorkoutsHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutsHistoryService.remove(+id);
  }
}
