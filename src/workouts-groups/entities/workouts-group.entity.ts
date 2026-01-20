import { Users, Workouts } from '@prisma/client';

export class WorkoutsGroup {
  id: number;
  name: string;
  image: string;
  userId: string;
  user?: Users;
  workouts?: Workouts[];
}
