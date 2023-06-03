import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WorkoutsGroupsService } from './workouts-groups.service';
import { CreateWorkoutsGroupDto } from './dto/create-workouts-group.dto';
import { UpdateWorkoutsGroupDto } from './dto/update-workouts-group.dto';

@Controller('workouts-groups')
export class WorkoutsGroupsController {
  constructor(private readonly workoutsGroupsService: WorkoutsGroupsService) { }

  @Post()
  create(@Body() createWorkoutsGroupDto: CreateWorkoutsGroupDto) {
    return this.workoutsGroupsService.create(createWorkoutsGroupDto);
  }

  @Get()
  findAll() {
    return this.workoutsGroupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workoutsGroupsService.findOne(+id);
  }


  @Get(':id/exercises')
  findOneExercises(@Param('id') id: string) {
    return this.workoutsGroupsService.findAllExercises(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkoutsGroupDto: UpdateWorkoutsGroupDto,
  ) {
    return this.workoutsGroupsService.update(+id, updateWorkoutsGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutsGroupsService.remove(+id);
  }
}
