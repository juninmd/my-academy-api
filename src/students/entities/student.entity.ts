import { Personals, Users } from '@prisma/client';

export class Student {
  id: number;
  userId: string;
  personalsId: number | null;
  Personals?: Personals | null;
  Users?: Users;
}
