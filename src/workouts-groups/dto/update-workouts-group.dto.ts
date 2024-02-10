import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateWorkoutsGroupDto } from './create-workouts-group.dto';

export class UpdateWorkoutsGroupDto extends PartialType(
  CreateWorkoutsGroupDto,
) {
  @ApiProperty({ required: true })
  name?: string;
  @ApiProperty({ required: true })
  description?: string;
  @ApiProperty({ required: true })
  dateStart?: Date;
  @ApiProperty({ required: true })
  dateEnd?: Date;
  @ApiProperty({ required: true })
  image: string;
}
