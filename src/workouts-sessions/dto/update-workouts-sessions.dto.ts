import { PartialType } from '@nestjs/swagger';
import { CreateWorkoutsSessionsDto } from './create-workouts-sessions.dto';

export class UpdateWorkoutsSessionsDto extends PartialType(
  CreateWorkoutsSessionsDto,
) {}
