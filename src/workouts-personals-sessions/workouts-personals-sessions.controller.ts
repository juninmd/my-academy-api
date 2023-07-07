import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { WorkoutsPersonalsSessionsService } from './workouts-personals-sessions.service';
import { CreateWorkoutsPersonalsSessionDto } from './dto/create-workouts-personals-session.dto';
import { UpdateWorkoutsPersonalsSessionDto } from './dto/update-workouts-personals-session.dto';

@Controller('workouts-personals-sessions')
export class WorkoutsPersonalsSessionsController {
  constructor(
    private readonly workoutsPersonalsSessionsService: WorkoutsPersonalsSessionsService,
  ) {}

  @Post()
  create(
    @Body()
    createWorkoutsPersonalsSessionDto: CreateWorkoutsPersonalsSessionDto,
  ) {
    return this.workoutsPersonalsSessionsService.create(
      createWorkoutsPersonalsSessionDto,
    );
  }

  @Get()
  findAll() {
    return this.workoutsPersonalsSessionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workoutsPersonalsSessionsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateWorkoutsPersonalsSessionDto: UpdateWorkoutsPersonalsSessionDto,
  ) {
    return this.workoutsPersonalsSessionsService.update(
      +id,
      updateWorkoutsPersonalsSessionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutsPersonalsSessionsService.remove(+id);
  }

  @Post('/bulk')
  createBulk(
    @Body()
    createWorkoutsPersonalsSessionDtos: CreateWorkoutsPersonalsSessionDto[],
  ) {
    for (const createWorkoutsPersonalsSessionDto of createWorkoutsPersonalsSessionDtos) {
      this.workoutsPersonalsSessionsService.create(
        createWorkoutsPersonalsSessionDto,
      );
    }
    return {};
  }
}
