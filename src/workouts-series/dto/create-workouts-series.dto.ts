import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkoutsSeriesDto {
  @ApiProperty({ required: false })
  id: number;

  @ApiProperty({ required: true })
  workoutId: number;

  @ApiProperty({ required: false })
  weight?: number;

  @ApiProperty({ required: true })
  rest: number;

  @ApiProperty({ required: true })
  repetitions: number;
}
