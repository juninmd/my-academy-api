import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class CreateWorkoutsSeriesDto {
  @ApiProperty({ description: 'The ID of the workout this series belongs to', example: 1, required: false })
  @IsOptional()
  @IsNumber()
  workoutId?: number;

  @ApiProperty({ description: 'Number of repetitions for this series', example: 12 })
  @IsNumber()
  repetitions: number;

  @ApiProperty({ description: 'Weight used for this series (in kg)', example: 50, required: false })
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiProperty({ description: 'Rest time after this series (in seconds)', example: 60 })
  @IsNumber()
  rest: number;
}
