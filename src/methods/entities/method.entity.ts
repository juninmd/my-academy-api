import { Workout } from '../../workouts/entities/workout.entity';
import { ApiProperty } from '@nestjs/swagger';

export class Method {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the method',
  })
  id: number;

  @ApiProperty({ example: 'Pyramid', description: 'Name of the method' })
  name: string;

  @ApiProperty({
    example: 'Increase weight, decrease reps',
    description: 'Description of the method',
  })
  description: string;

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
