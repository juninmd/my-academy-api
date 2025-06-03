import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateWorkoutsSeriesDto } from '../../workouts-series/dto/create-workouts-series.dto'; // Importar o DTO correto

export class CreateWorkoutDto {
  @ApiProperty({ required: true })
  @IsNumber()
  exerciseId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  methodId?: number;

  @ApiProperty({ required: false, type: [CreateWorkoutsSeriesDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkoutsSeriesDto)
  workoutSeries?: CreateWorkoutsSeriesDto[]; // Adicionado para refletir a relação 1:N com WorkoutSeries
}
