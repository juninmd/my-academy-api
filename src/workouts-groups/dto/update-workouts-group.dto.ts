import { PartialType } from '@nestjs/swagger';
import { CreateWorkoutsGroupDto } from './create-workouts-group.dto';

export class UpdateWorkoutsGroupDto extends PartialType(
  CreateWorkoutsGroupDto,
) {}
