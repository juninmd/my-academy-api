import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { WorkoutsGroupsService } from './workouts-groups.service';
import { CreateWorkoutsGroupDto } from './dto/create-workouts-group.dto';
import { UpdateWorkoutsGroupDto } from './dto/update-workouts-group.dto';

@Controller('workouts-groups')
export class WorkoutsGroupsController {
  constructor(private readonly workoutsGroupsService: WorkoutsGroupsService) {}

  @Post()
  async create(@Body() createWorkoutsGroupDto: CreateWorkoutsGroupDto) {
    return this.workoutsGroupsService.create(createWorkoutsGroupDto);
  }

  @Get('/user/:userId')
  findAll(@Param('userId') userId: string) {
    return this.workoutsGroupsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.workoutsGroupsService.findOne(id);
  }

  @Get(':id/exercises')
  findOneExercises(@Param('id', ParseIntPipe) id: number) {
    return this.workoutsGroupsService.findAllExercises(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWorkoutsGroupDto: UpdateWorkoutsGroupDto,
  ) {
    return this.workoutsGroupsService.update(id, updateWorkoutsGroupDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.workoutsGroupsService.remove(id);
  }
}
