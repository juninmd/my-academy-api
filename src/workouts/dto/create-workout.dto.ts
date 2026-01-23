import { ApiProperty } from '@nestjs/swagger';
import { CreateWorkoutSeriesNestedDto } from '../../workouts-series/dto/create-workout-series-nested.dto';
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsArray,
  IsInt,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateWorkoutDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the exercise',
    required: true,
  })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  exerciseId: number;

  @ApiProperty({
    example: 'Perform carefully',
    description: 'Optional description or notes',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 10,
    description: 'The ID of the workout group',
    required: true,
  })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  workoutsGroupsId: number;

  @ApiProperty({
    description: 'List of series for this workout',
    required: false,
    type: [CreateWorkoutSeriesNestedDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkoutSeriesNestedDto)
  workoutSeries?: CreateWorkoutSeriesNestedDto[];

  @ApiProperty({
    example: 2,
    description: 'The ID of the method used',
    required: false,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  methodId?: number;
}
