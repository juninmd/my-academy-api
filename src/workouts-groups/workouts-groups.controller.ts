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
import { WorkoutsGroupsService } from './workouts-groups.service';
import { CreateWorkoutsGroupDto } from './dto/create-workouts-group.dto';
import { UpdateWorkoutsGroupDto } from './dto/update-workouts-group.dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller('workouts-groups')
export class WorkoutsGroupsController {
  constructor(private readonly workoutsGroupsService: WorkoutsGroupsService) { }

  @Post()
  create(@Body() createWorkoutsGroupDto: CreateWorkoutsGroupDto) {
    return this.workoutsGroupsService.create(createWorkoutsGroupDto);
  }

  @Get(':userId')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(0)
  findAll(@Param('userId') userId: string) {
    return this.workoutsGroupsService.findAll(+userId);
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(0)
  findOne(@Param('id') id: string) {
    return this.workoutsGroupsService.findOne(+id);
  }

  @Get(':id/exercises')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(0)
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
