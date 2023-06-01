import { Workouts } from '@prisma/client';

export class Exercise {
  id: number;
  name: string;
  image: string;
  tips: string;
  mistakes: string;
  description: string | null;
  Workouts?: Workouts[];
}
