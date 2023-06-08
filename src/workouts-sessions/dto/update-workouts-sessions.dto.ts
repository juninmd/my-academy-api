import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateWorkoutsSessionsDto } from './create-workouts-sessions.dto';

export class UpdateWorkoutsSessionsDto extends PartialType(
  CreateWorkoutsSessionsDto,
) {
  @ApiProperty({ required: true })
  workoutGroupId: number;
  @ApiProperty({ required: true })
  date: Date;
}
