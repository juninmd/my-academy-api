import { ApiProperty } from '@nestjs/swagger';
import { CreateWorkoutsSeriesDto } from '../../workouts-series/dto/create-workouts-series.dto';

export class CreateWorkoutDto {
  @ApiProperty({ required: true })
  exerciseId: number;

  @ApiProperty({ required: true })
  description: string;

  @ApiProperty({ required: true })
  workoutsGroupsId: number;

  @ApiProperty({ required: true })
  workoutSeries?: CreateWorkoutsSeriesDto;
}
