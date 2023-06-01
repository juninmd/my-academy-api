import { Workouts } from '@prisma/client';

export class WorkoutsSessions {
  id: number;
  workoutId: number;
  date: Date;
  Workouts?: Workouts[];
}
