import { Personals, Users } from '@prisma/client';

export class Student {
  id: number;
  userId: number;
  personalsId: number | null;
  Personals?: Personals | null;
  Users?: Users;
}
