import { PartialType } from '@nestjs/swagger';
import { CreateWorkoutsHistoryDto } from './create-workouts-history.dto';

export class UpdateWorkoutsHistoryDto extends PartialType(CreateWorkoutsHistoryDto) {}
