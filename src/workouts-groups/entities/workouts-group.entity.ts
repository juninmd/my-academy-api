import { Users } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Workout } from '../../workouts/entities/workout.entity';

export class WorkoutsGroup {
  @ApiProperty({ example: 1, description: 'The unique identifier of the workout group' })
  id: number;

  @ApiProperty({ example: 'Leg Day', description: 'Name of the workout group' })
  name: string;

  @ApiProperty({ example: 'https://example.com/legs.jpg', description: 'Image URL' })
  image: string;

  @ApiProperty({ example: 'user-uuid', description: 'The ID of the user' })
  userId: string;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z', description: 'Creation date' })
  createdAt: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z', description: 'Last update date' })
  updatedAt: Date;

  @ApiProperty({ required: false, type: () => Object, description: 'The owner of the group' })
  user?: Users;

  @ApiProperty({ required: false, type: () => [Workout], isArray: true, description: 'Workouts in this group' })
  workouts?: Workout[];
}
