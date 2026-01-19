import { ApiProperty } from '@nestjs/swagger';
import { CreateWorkoutSeriesNestedDto } from '../../workouts-series/dto/create-workout-series-nested.dto';
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

  @ApiProperty({ required: false, type: [CreateWorkoutSeriesNestedDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkoutSeriesNestedDto)
  workoutSeries?: CreateWorkoutSeriesNestedDto[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  methodId?: number;
}
