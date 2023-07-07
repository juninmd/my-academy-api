import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateWorkoutsPersonalsSessionDto } from './create-workouts-personals-session.dto';

export class UpdateWorkoutsPersonalsSessionDto extends PartialType(
  CreateWorkoutsPersonalsSessionDto,
) {
  @ApiProperty({ required: true })
  id?: number;
}
