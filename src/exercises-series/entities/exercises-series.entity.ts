import { Workouts } from '@prisma/client';

export class ExercisesSeries {
  id: number;
  workoutId: number;
  repetitions: number;
  weight: number | null;
  rest: number;
  Workouts?: Workouts[];
}
