import { Users, Methods, Workouts } from '@prisma/client';

export class WorkoutsGroup {
  id: number;
  name: string;
  image: string;
  userId: string;
  methodId?: number;
  user?: Users;
  method?: Methods;
  workouts?: Workouts[];
}
