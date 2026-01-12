import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateWorkoutsSeriesDto } from '../../workouts-series/dto/create-workouts-series.dto'; // Importar o DTO correto

export class CreateWorkoutDto {
  @ApiProperty({ description: 'The ID of the exercise associated with this workout', example: 1 })
  @IsNumber()
  exerciseId: number;

  @ApiProperty({ description: 'A description for this specific workout', example: 'Warm-up set followed by 3 working sets.', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'The ID of the method used for this workout (e.g., FST-7, Drop Set)', example: 1, required: false })
  @IsOptional()
  @IsNumber()
  methodId?: number;

  @ApiProperty({ description: 'An array of workout series for this workout', type: [CreateWorkoutsSeriesDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkoutsSeriesDto)
  workoutSeries?: CreateWorkoutsSeriesDto[];
}
