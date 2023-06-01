import { Exercises, ExercisesSeries, WorkoutSessions } from '@prisma/client';

export class Workout {
  id: number;
  exerciseId: number;
  description: string;
  exercisesSeriesId: number | null;
  workoutsSessionsId: number | null;
  Exercises?: Exercises;
  ExercisesSeries?: ExercisesSeries | null;
  WorkoutSessions?: WorkoutSessions | null;
}
