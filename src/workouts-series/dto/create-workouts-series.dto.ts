import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class CreateWorkoutsSeriesDto {
  @ApiProperty({ required: true, description: 'ID do Treino ao qual a série pertence' })
  @IsNumber()
  workoutId: number;

  @ApiProperty({ required: true })
  @IsNumber()
  repetitions: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiProperty({ required: true })
  @IsNumber()
  rest: number;
}
