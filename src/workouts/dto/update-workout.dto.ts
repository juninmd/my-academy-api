import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateWorkoutDto } from './create-workout.dto';

export class UpdateWorkoutDto extends PartialType(CreateWorkoutDto) {
  @ApiProperty({ required: true })
  description?: string;
}
