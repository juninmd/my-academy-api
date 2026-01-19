import { Workouts } from '@prisma/client';

export class WorkoutsSeries {
  id: number;
  workoutId: number;
  repetitions: number;
  weight: number | null;
  rest: number | null;
  time: number | null;
  distance: number | null;
  speed: number | null;
  createdAt: Date;
  updatedAt: Date;
  workout?: Workouts;
}
