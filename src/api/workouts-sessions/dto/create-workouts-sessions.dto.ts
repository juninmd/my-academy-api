import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsInt, IsOptional } from 'class-validator';

export class CreateWorkoutsSessionsDto {
  @ApiProperty({})
  readonly id?: number;

  @ApiProperty({ required: true, description: 'Treino' })
  @IsInt()
  workoutGroupId: number;

  @ApiProperty({
    type: Date,
    default: new Date(),
  })
  @IsDateString()
  date: Date;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;

  @IsOptional()
  @IsDateString()
  completedAt?: Date;

  readonly Workouts: any[];
}
