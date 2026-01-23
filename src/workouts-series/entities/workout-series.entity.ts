import { ApiProperty } from '@nestjs/swagger';

export class WorkoutSeries {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the series',
  })
  id: number;

  @ApiProperty({ example: 1, description: 'The ID of the parent workout' })
  workoutId: number;

  @ApiProperty({ example: 15, description: 'Number of repetitions' })
  repetitions: number;

  @ApiProperty({
    example: 10,
    description: 'Weight in kg',
    required: false,
    nullable: true,
  })
  weight: number | null;

  @ApiProperty({
    example: 60,
    description: 'Rest time in seconds',
    required: false,
    nullable: true,
  })
  rest: number | null;

  @ApiProperty({
    example: 60,
    description: 'Time in seconds (for cardio)',
    required: false,
    nullable: true,
  })
  time: number | null;

  @ApiProperty({
    example: 5.2,
    description: 'Distance in km (for cardio)',
    required: false,
    nullable: true,
  })
  distance: number | null;

  @ApiProperty({
    example: 10.5,
    description: 'Speed in km/h or pace',
    required: false,
    nullable: true,
  })
  speed: number | null;

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
}
