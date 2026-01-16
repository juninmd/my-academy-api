import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateWorkoutsSeriesDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  workoutId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  rest: number;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  repetitions: number;
}
