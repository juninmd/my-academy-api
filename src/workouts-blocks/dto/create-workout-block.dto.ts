import { IsNumber, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateWorkoutsSeriesDto } from '../../workouts-series/dto/create-workouts-series.dto';

export class CreateWorkoutBlockDto {
  @IsNumber()
  workoutId: number;

  @IsNumber()
  order: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkoutsSeriesDto)
  workoutSeries?: CreateWorkoutsSeriesDto[];
}
