import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsArray, ValidateNested, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateWorkoutBlockDto } from '../../workouts-blocks/dto/create-workout-block.dto';
import { CreateWorkoutDto } from '../../workouts/dto/create-workout.dto';

export class CreateWorkoutsGroupDto {
  @ApiProperty({ description: 'The name of the workout group', example: 'Full Body Workout' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Observations about the workout group', example: 'Focus on compound movements.', required: false })
  @IsOptional()
  @IsString()
  observations?: string;

  @ApiProperty({ description: 'The ID of the user (student) this workout group belongs to', example: 'clx0d4d0d000008jv03712345' })
  @IsString()
  userId: string;

  @ApiProperty({ description: 'The ID of the personal trainer associated with this workout group', example: 1, required: false })
  @IsOptional()
  @IsNumber()
  personalId?: number;

  @ApiProperty({ description: 'An array of workout blocks within this group', type: [CreateWorkoutBlockDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkoutBlockDto)
  @ApiProperty({ description: 'An array of workout blocks within this group', type: [CreateWorkoutBlockDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkoutBlockDto)
  workoutsBlocks?: CreateWorkoutBlockDto[];

  @ApiProperty({ description: 'An array of workouts (flat structure)', type: [CreateWorkoutDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkoutDto)
  workouts?: CreateWorkoutDto[];
}
