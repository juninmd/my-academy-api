import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateWorkoutDto } from '../../workouts/dto/create-workout.dto'; // Importar o DTO correto

export class CreateWorkoutBlockDto {
  @ApiProperty({ description: 'The ID of the workout group this block belongs to', example: 1, required: false })
  @IsOptional()
  @IsNumber()
  workoutGroupId?: number; // Adicionado para referenciar WorkoutsGroups

  @ApiProperty({ description: 'The order of the workout block within the workout group', example: 1 })
  @IsNumber()
  order: number;

  @ApiProperty({ description: 'An array of workouts within this block', type: [CreateWorkoutDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkoutDto)
  workouts?: CreateWorkoutDto[]; // Adicionado para refletir a relação 1:N com Workouts
}
