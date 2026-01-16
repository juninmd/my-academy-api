import { ApiProperty } from '@nestjs/swagger';
import { CreateWorkoutsSeriesDto } from '../../workouts-series/dto/create-workouts-series.dto';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateWorkoutDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  exerciseId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  workoutsGroupsId: number;

  @ApiProperty({ required: false, type: [CreateWorkoutsSeriesDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkoutsSeriesDto)
  workoutSeries?: CreateWorkoutsSeriesDto[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  methodId?: number;
}
