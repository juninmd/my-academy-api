import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsNotEmpty,
  IsInt,
  IsPositive,
  Min,
} from 'class-validator';

export class CreateWorkoutsSeriesDto {
  @ApiProperty({
    example: 1,
    description: 'ID of the series (optional for update)',
    required: false,
  })
  @IsOptional()
  @IsInt()
  id?: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the parent workout',
    required: false,
  })
  @IsOptional()
  @IsInt()
  workoutId?: number;

  @ApiProperty({
    example: 15,
    default: 10,
    description: 'Weight in kg',
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  weight?: number;

  @ApiProperty({
    example: 60,
    default: 60,
    description: 'Rest time in seconds',
    required: true,
  })
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  rest: number;

  @ApiProperty({
    example: 12,
    default: 15,
    description: 'Number of repetitions',
    required: true,
  })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  repetitions: number;

  @ApiProperty({
    example: 300,
    description: 'Time in seconds',
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  time?: number;

  @ApiProperty({ example: 5.5, description: 'Distance in km', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  distance?: number;

  @ApiProperty({ example: 10, description: 'Speed in km/h', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  speed?: number;
}
