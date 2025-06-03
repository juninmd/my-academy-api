import { IsNumber, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateWorkoutDto } from '../../workouts/dto/create-workout.dto'; // Importar o DTO correto

export class CreateWorkoutBlockDto {
  @IsNumber()
  workoutGroupId: number; // Adicionado para referenciar WorkoutsGroups

  @IsNumber()
  order: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkoutDto)
  workouts?: CreateWorkoutDto[]; // Adicionado para refletir a relação 1:N com Workouts
}
