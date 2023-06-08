import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WorkoutsSessionsService } from './workouts-sessions.service';
import { CreateWorkoutsSessionsDto } from './dto/create-workouts-sessions.dto';
import { UpdateWorkoutsSessionsDto } from './dto/update-workouts-sessions.dto';

@Controller('workouts-sessions')
export class WorkoutsSessionsController {
  constructor(
    private readonly workoutsSessionsService: WorkoutsSessionsService,
  ) { }

  @Post()
  create(@Body() createWorkoutsSessionsDto: CreateWorkoutsSessionsDto) {
    return this.workoutsSessionsService.create(createWorkoutsSessionsDto);
  }

  @Get(':idUser')
  findAll(@Param('idUser') idUser: number) {
    return this.workoutsSessionsService.findAll(+idUser);
  }

  @Get(':idUser/summary')
  findSummary(@Param('idUser') idUser: number) {
    return this.workoutsSessionsService.findSummary(+idUser);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workoutsSessionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkoutsSessionsDto: UpdateWorkoutsSessionsDto,
  ) {
    return this.workoutsSessionsService.update(+id, updateWorkoutsSessionsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutsSessionsService.remove(+id);
  }
}
