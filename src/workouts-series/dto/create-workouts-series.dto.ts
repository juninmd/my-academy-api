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

  @ApiProperty({ required: false, default: 10 })
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiProperty({ required: true, default: 60 })
  @IsNumber()
  @IsNotEmpty()
  rest: number;

  @ApiProperty({ required: true, default: 15 })
  @IsNumber()
  @IsNotEmpty()
  repetitions: number;

  @ApiProperty({ required: false, description: 'Time in seconds' })
  @IsOptional()
  @IsNumber()
  time?: number;

  @ApiProperty({ required: false, description: 'Distance in km' })
  @IsOptional()
  @IsNumber()
  distance?: number;

  @ApiProperty({ required: false, description: 'Speed in km/h or pace' })
  @IsOptional()
  @IsNumber()
  speed?: number;
}
