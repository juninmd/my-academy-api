import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PhysicalAssessmentSchedulesService } from './physical-assessment-schedules.service';
import { CreatePhysicalAssessmentScheduleDto } from './dto/create-physical-assessment-schedule.dto';
import { UpdatePhysicalAssessmentScheduleDto } from './dto/update-physical-assessment-schedule.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('physical-assessment-schedules')
@Controller('physical-assessment-schedules')
export class PhysicalAssessmentSchedulesController {
  constructor(private readonly physicalAssessmentSchedulesService: PhysicalAssessmentSchedulesService) {}

  @Post()
  create(@Body() createPhysicalAssessmentScheduleDto: CreatePhysicalAssessmentScheduleDto) {
    return this.physicalAssessmentSchedulesService.create(createPhysicalAssessmentScheduleDto);
  }

  @Get()
  findAll() {
    return this.physicalAssessmentSchedulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.physicalAssessmentSchedulesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhysicalAssessmentScheduleDto: UpdatePhysicalAssessmentScheduleDto) {
    return this.physicalAssessmentSchedulesService.update(+id, updatePhysicalAssessmentScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.physicalAssessmentSchedulesService.remove(+id);
  }
}
