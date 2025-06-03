import { Users, Personals, PersonalClassSchedule } from '@prisma/client';

export class PersonalTrainingPlan {
  id: number;
  userId: string;
  personalId: number;
  startDate: Date;
  endDate?: Date;
  sessionsPerWeek: number;
  pricePerSession?: number;
  billingType?: string;
  status: string;
  user?: Users;
  personal?: Personals;
  classSchedules?: PersonalClassSchedule[];
}
