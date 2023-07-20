import { Users, Methods, Workouts } from '@prisma/client';

export class WorkoutsGroup {
  id: number;
  name: string;
  description: string;
  image: string;
  dateStart: Date;
  dateEnd: Date;
  level: number;
  userId: number;
  methodId?: number;
  user?: Users;
  method?: Methods;
  workouts?: Workouts[];
}
