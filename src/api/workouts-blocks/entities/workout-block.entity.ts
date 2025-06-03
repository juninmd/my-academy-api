import { WorkoutsSeries } from './../../workouts-series/entities/workout-series.entity';

export class WorkoutBlock {
  id: number;
  workoutId: number;
  order: number; // Ordem do bloco dentro de um treino
  workoutSeries?: WorkoutsSeries[]; // Séries de exercícios dentro deste bloco
}
