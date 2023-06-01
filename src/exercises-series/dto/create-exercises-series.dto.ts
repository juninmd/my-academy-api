import { ApiProperty } from '@nestjs/swagger';

export class CreateExercisesSeriesDto {
  @ApiProperty({ required: true })
  workoutId: number;
  @ApiProperty({ required: true })
  weight?: number;
  @ApiProperty({ required: true })
  rest: number;
}
