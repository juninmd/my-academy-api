import { ApiProperty } from '@nestjs/swagger';
import { CreateWorkoutsSeriesDto } from '../../workouts-series/dto/create-workouts-series.dto';

export class CreateWorkoutDto {

  @ApiProperty({ required: false })
  id: number;

  @ApiProperty({ required: true })
  exerciseId: number;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  workoutsGroupsId?: number;

  @ApiProperty({ required: false, type: [CreateWorkoutsSeriesDto] })
  workoutSeries?: CreateWorkoutsSeriesDto[];

  @ApiProperty({ required: false })
  methodId?: number;
}
