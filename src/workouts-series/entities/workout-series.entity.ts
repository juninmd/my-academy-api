import { WorkoutSeries, Workouts } from '@prisma/client';

export class WorkoutsSeries {
  id: number;
  workoutId: number;
  repetitions: number;
  weight: number | null;
  rest: number;
  Workouts?: Workouts[];
}
