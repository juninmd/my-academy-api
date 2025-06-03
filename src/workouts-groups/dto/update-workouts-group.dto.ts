import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateWorkoutsGroupDto } from './create-workouts-group.dto';
import { IsOptional, IsArray, ValidateNested, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateWorkoutBlockDto } from '../../workouts-blocks/dto/update-workout-block.dto';

export class UpdateWorkoutsGroupDto extends PartialType(
  CreateWorkoutsGroupDto,
) {
  // As propriedades name, observations, userId, personalId e workoutsBlocks
  // já são tornadas opcionais por PartialType(CreateWorkoutsGroupDto).
  // Não é necessário redefini-las aqui a menos que haja validações adicionais.
  // Removendo as redefinições para evitar conflitos e duplicações.
}
