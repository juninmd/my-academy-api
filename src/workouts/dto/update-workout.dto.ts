import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateWorkoutDto } from './create-workout.dto';

export class UpdateWorkoutDto extends PartialType(CreateWorkoutDto) {
  @ApiProperty({ required: true })
  exerciseId: number;

  @ApiProperty({ required: true })
  description: string;

  @ApiProperty({ required: true })
  workoutsGroupsId: number;
}
