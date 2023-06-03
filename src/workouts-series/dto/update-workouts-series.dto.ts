import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateWorkoutsSeriesDto } from './create-workouts-series.dto';

export class UpdateExercisesSeriesDto extends PartialType(
  CreateWorkoutsSeriesDto,
) {
  @ApiProperty({ required: true })
  workoutId?: number;
  @ApiProperty({ required: true })
  weight?: number;
  @ApiProperty({ required: true })
  rest?: number;
}
