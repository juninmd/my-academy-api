import { Users, Methods, Workouts } from '@prisma/client';

export class WorkoutsGroup {
  id: number;
  name: string;
  image: string;
  userId: number;
  methodId?: number;
  user?: Users;
  method?: Methods;
  workouts?: Workouts[];
}
