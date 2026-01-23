import { WorkoutSeries } from '../../workouts-series/entities/workout-series.entity';
import { ApiProperty } from '@nestjs/swagger';

export class Workout {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the workout',
  })
  id: number;

  @ApiProperty({ example: 1, description: 'The ID of the exercise' })
  exerciseId: number;

  @ApiProperty({
    example: '3 sets of 10 reps',
    description: 'Description or notes for the workout',
  })
  description: string;

  @ApiProperty({ example: 1, description: 'The ID of the workout group' })
  workoutsGroupsId: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the method',
    required: false,
    nullable: true,
  })
  methodId: number | null;

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

  // Relations
  // We can choose to document these or not depending on if they are serialized.
  // For now, I'll document workoutSeries as it is often included.

  @ApiProperty({ type: () => [WorkoutSeries], required: false })
  workoutSeries?: WorkoutSeries[];
}
