import { ApiProperty } from '@nestjs/swagger';

export class CreateExerciseDto {
  @ApiProperty({ required: true, description: 'Treino' })
  readonly name: string;
  @ApiProperty({ required: true, description: 'Treino' })
  readonly image: string;
  @ApiProperty({ required: true, description: 'Treino' })
  readonly tips: string;
  @ApiProperty({ required: true, description: 'Treino' })
  readonly mistakes: string;
  @ApiProperty({ description: 'Treino' })
  readonly description?: string;
}
