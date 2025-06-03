import { PartialType } from '@nestjs/swagger';
import { CreatePersonalTrainingPlanDto } from './create-personal-training-plan.dto';

export class UpdatePersonalTrainingPlanDto extends PartialType(
  CreatePersonalTrainingPlanDto,
) {}
