import { Workout } from '../../workouts/entities/workout.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ExerciseType } from '@prisma/client';

export class Exercise {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the exercise',
  })
  id: number;

  @ApiProperty({ example: 'Bench Press', description: 'Name of the exercise' })
  name: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'Illustrative image URL',
  })
  image: string;

  @ApiProperty({ example: 'Keep back straight', description: 'Execution tips' })
  tips: string;

  @ApiProperty({ example: 'Arching back', description: 'Common mistakes' })
  mistakes: string;

  @ApiProperty({
    enum: ExerciseType,
    example: 'STRENGTH',
    description: 'Type of exercise',
  })
  type: ExerciseType;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Creation date',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Last update date',
  })
  updatedAt: Date;

  @ApiProperty({
    required: false,
    type: () => [Workout],
    isArray: true,
    description: 'Related workouts',
  })
  workouts?: Workout[];
}
