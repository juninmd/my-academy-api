import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateWorkoutsGroupDto } from './create-workouts-group.dto';

export class UpdateWorkoutsGroupDto extends PartialType(
  CreateWorkoutsGroupDto,
) {
  @ApiProperty({ required: true })
  name?: string;
  @ApiProperty({ required: true })
  image: string;
}
