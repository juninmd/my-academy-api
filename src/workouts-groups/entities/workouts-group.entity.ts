import { Users, Methods, Workouts, Personals, WorkoutSessions } from '@prisma/client';

export class WorkoutsGroup {
  id: number;
  name: string;
  image: string;
  observations?: string;
  userId: string;
  methodId?: number;
  user?: Users;
  personal?: Personals; // Adicionado para consistência com o schema
  method?: Methods;
  workouts?: Workouts[];
  WorkoutSessions?: WorkoutSessions[]; // Adicionado para consistência com o schema
}
