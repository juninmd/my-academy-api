import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsInt, IsOptional } from 'class-validator';

export class CreateWorkoutsSessionsDto {
  @ApiProperty({ description: 'The unique ID of the workout session (auto-generated)', example: 1, required: false })
  readonly id?: number;

  @ApiProperty({ description: 'The ID of the workout group for this session', example: 1 })
  @IsInt()
  workoutGroupId: number;

  @ApiProperty({ description: 'The date of the workout session', example: '2025-07-20T10:00:00Z' })
  @IsDateString()
  date: Date;

  @ApiProperty({ description: 'Indicates if the workout session is completed', example: false, required: false })
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;

  @ApiProperty({ description: 'The timestamp when the workout session was completed', example: '2025-07-20T11:30:00Z', required: false })
  @IsOptional()
  @IsDateString()
  completedAt?: Date;

  @ApiProperty({ description: 'An array of workouts associated with this session', type: 'array', items: { type: 'object' }, required: false })
  readonly Workouts: any[];
}
