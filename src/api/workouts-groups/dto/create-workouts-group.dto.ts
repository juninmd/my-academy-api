import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsArray, ValidateNested, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateWorkoutBlockDto } from '../../workouts-blocks/dto/create-workout-block.dto'; // Importar o DTO correto

export class CreateWorkoutsGroupDto {
  @ApiProperty({ required: true, description: 'Nome do Grupo de Treino' })
  @IsString()
  name: string;

  @ApiProperty({ required: false, description: 'Observações do Grupo de Treino' })
  @IsOptional()
  @IsString()
  observations?: string;

  @ApiProperty({ required: true, description: 'ID do Usuário (Estudante)' })
  @IsString()
  userId: string;

  @ApiProperty({ required: false, description: 'ID do Personal Trainer' })
  @IsOptional()
  @IsNumber()
  personalId?: number;

  @ApiProperty({ required: false, type: [CreateWorkoutBlockDto], description: 'Blocos de Treino' })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkoutBlockDto)
  workoutsBlocks?: CreateWorkoutBlockDto[]; // Alterado para workoutsBlocks (singular)
}
