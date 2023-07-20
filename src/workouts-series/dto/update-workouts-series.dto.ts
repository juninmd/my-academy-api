import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateWorkoutsSeriesDto } from './create-workouts-series.dto';

export class UpdateWorkoutsSeriesDto extends PartialType(
  CreateWorkoutsSeriesDto,
) {

}
