import { WorkoutsGroups, Personals } from '@prisma/client';

export class User {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  telegramId?: string;
  personals?: Personals[];
  students?: Personals[];
  workoutsGroups?: WorkoutsGroups[];
}
