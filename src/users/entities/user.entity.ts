import { Personals } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { WorkoutsGroup } from '../../workouts-groups/entities/workouts-group.entity';

export class User {
  @ApiProperty({
    example: 'user-uuid',
    description: 'The unique identifier of the user',
  })
  id: string;

  @ApiProperty({ example: 'John Doe', description: 'Name of the user' })
  name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Email of the user',
  })
  email: string;

  @ApiProperty({
    example: 'https://example.com/photo.jpg',
    description: 'Photo URL',
  })
  photoUrl: string;

  @ApiProperty({
    example: '123456789',
    description: 'Telegram ID',
    required: false,
  })
  telegramId?: string;

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
    type: () => Object,
    isArray: true,
    description: 'Personal trainer relations',
  })
  personals?: Personals[];

  @ApiProperty({
    required: false,
    type: () => Object,
    isArray: true,
    description: 'Student relations',
  })
  students?: Personals[];

  @ApiProperty({
    required: false,
    type: () => [WorkoutsGroup],
    isArray: true,
    description: 'Workout groups',
  })
  workoutsGroups?: WorkoutsGroup[];
}
