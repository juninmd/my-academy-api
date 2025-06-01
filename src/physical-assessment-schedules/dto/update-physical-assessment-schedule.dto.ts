import { PartialType } from '@nestjs/swagger';
import { CreatePhysicalAssessmentScheduleDto } from './create-physical-assessment-schedule.dto';

export class UpdatePhysicalAssessmentScheduleDto extends PartialType(
  CreatePhysicalAssessmentScheduleDto,
) {}
