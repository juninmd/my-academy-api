import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateWorkoutBlockDto } from '../../workouts-blocks/dto/create-workout-block.dto';

export class CreateWorkoutDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  id?: number;

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
  workoutsGroupsId?: number;

  @ApiProperty({ required: false, type: [CreateWorkoutBlockDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkoutBlockDto)
  workoutBlocks?: CreateWorkoutBlockDto[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  methodId?: number;
}
