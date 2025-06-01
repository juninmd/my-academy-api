import { WorkoutSeries, Workouts } from '@prisma/client';

export class WorkoutsSeries {
  id: number;
  workoutId: number;
  workoutBlockId: number | null; // Adiciona a referência ao bloco de exercícios
  repetitions: number;
  weight: number | null;
  rest: number;
  Workouts?: Workouts[];
}
