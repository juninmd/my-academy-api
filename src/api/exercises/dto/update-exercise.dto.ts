import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateExerciseDto } from './create-exercise.dto';

export class UpdateExerciseDto extends PartialType(CreateExerciseDto) {
  @ApiProperty({ required: true })
  name?: string;
  @ApiProperty({ required: true })
  image?: string;
  @ApiProperty({ required: true })
  tips?: string;
  @ApiProperty({ required: true })
  mistakes?: string;
  @ApiProperty({ required: true })
  description?: string;
}
