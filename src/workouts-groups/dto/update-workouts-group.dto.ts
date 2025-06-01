import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateWorkoutsGroupDto } from './create-workouts-group.dto';

export class UpdateWorkoutsGroupDto extends PartialType(
  CreateWorkoutsGroupDto,
) {
  @ApiProperty({ required: false })
  name?: string;
  @ApiProperty({ required: false })
  image?: string;
  @ApiProperty({ required: false })
  observations?: string;
}
