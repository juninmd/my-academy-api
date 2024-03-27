import { Users } from '@prisma/client';
import { Personal } from '../../personals/entities/personal.entity';

export class WorkoutsPersonalsSession {
  id: number;
  date: Date;
  personalsId: string;
  personals: Personal[];
  users: Users[];
  userId: string;
  observation?: string;
}
