import { ApiProperty } from '@nestjs/swagger';

export class CreateExerciseDto {
  @ApiProperty({ description: 'The name of the exercise', example: 'Supino Reto com Halteres' })
  readonly name: string;

  @ApiProperty({ description: 'URL of the exercise image', example: 'https://example.com/supino_reto.jpg' })
  readonly image: string;

  @ApiProperty({ description: 'Tips for performing the exercise correctly', example: 'Mantenha a coluna reta e o abdômen contraído.' })
  readonly tips: string;

  @ApiProperty({ description: 'Common mistakes to avoid during the exercise', example: 'Não arquear as costas ou descer demais o peso.' })
  readonly mistakes: string;

  @ApiProperty({ description: 'Detailed description of the exercise', example: 'Exercício para peito com foco na porção central.', required: false })
  readonly description?: string;
}
