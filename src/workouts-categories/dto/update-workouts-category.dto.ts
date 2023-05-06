import { PartialType } from '@nestjs/swagger';
import { CreateWorkoutsCategoryDto } from './create-workouts-category.dto';

export class UpdateWorkoutsCategoryDto extends PartialType(CreateWorkoutsCategoryDto) {}
