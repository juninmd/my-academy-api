import { OmitType } from '@nestjs/swagger';
import { CreateWorkoutDto } from './create-workout.dto';

export class CreateWorkoutNestedDto extends OmitType(CreateWorkoutDto, [
  'workoutsGroupsId',
] as const) {}
