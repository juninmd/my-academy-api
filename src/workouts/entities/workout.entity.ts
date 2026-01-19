import { Exercises, WorkoutsGroups } from '@prisma/client';
import { WorkoutsSeries } from '../../workouts-series/entities/workout-series.entity';

export class Workout {
  id: number;
  exerciseId: number;
  description: string;
  workoutsGroupsId: number;
  methodId: number | null;
  createdAt: Date;
  updatedAt: Date;

  exercise?: Exercises;
  workoutGroup?: WorkoutsGroups;
  workoutSeries?: WorkoutsSeries[];
}
