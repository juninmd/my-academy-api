import { Workouts } from '@prisma/client';

export class WorkoutsSessions {
  id: number;
  workoutGroupId: number;
  date: Date;
  Workouts?: Workouts[];
}
