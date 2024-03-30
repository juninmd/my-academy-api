import { Personals, WorkoutsGroups } from '@prisma/client';

export class User {
  id: number;
  name: string;
  email: string;
  photoUrl: string;
  telegramId?: string;
  Personals?: User[];
  Students?: User[];
  WorkoutsGroups?: WorkoutsGroups[];
}
