import { PartialType } from '@nestjs/swagger';
import { CreateExercisesSeryDto } from './create-exercises-sery.dto';

export class UpdateExercisesSeryDto extends PartialType(CreateExercisesSeryDto) {}
