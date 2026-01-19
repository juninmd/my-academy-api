import { OmitType } from '@nestjs/swagger';
import { CreateWorkoutsSeriesDto } from './create-workouts-series.dto';

export class CreateWorkoutSeriesNestedDto extends OmitType(
  CreateWorkoutsSeriesDto,
  ['workoutId', 'id'] as const,
) {}
