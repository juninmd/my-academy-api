import { Exercises, WorkoutSeries, WorkoutSessions } from '@prisma/client';
import { WorkoutsGroup } from '../../workouts-groups/entities/workouts-group.entity';

export class Workout {
  id: number;
  exerciseId: number;
  description: string;
  workoutGroupId: number;
  Exercise: Exercises;
  workoutGroup: WorkoutsGroup;
  WorkoutSeries?: WorkoutSeries[];
  WorkoutSessions?: WorkoutSessions[];
}
