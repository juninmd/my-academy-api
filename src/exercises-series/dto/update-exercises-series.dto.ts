import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateExercisesSeriesDto } from './create-exercises-series.dto';

export class UpdateExercisesSeryDto extends PartialType(
  CreateExercisesSeriesDto,
) {
  @ApiProperty({ required: true })
  workoutId?: number;
  @ApiProperty({ required: true })
  weight?: number;
  @ApiProperty({ required: true })
  rest?: number;
}
