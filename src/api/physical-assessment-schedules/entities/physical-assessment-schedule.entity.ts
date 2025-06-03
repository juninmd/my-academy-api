import { Users, Personals } from '@prisma/client';

export class PhysicalAssessmentSchedule {
  id: number;
  date: Date;
  time: string;
  userId: string;
  personalId: number;
  status: string;
  user?: Users;
  personal?: Personals;
}
