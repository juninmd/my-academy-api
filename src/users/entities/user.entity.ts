import { Personals, Students, WorkoutsGroups } from '@prisma/client';

export class User {
  id: number;
  name: string;
  email: string;
  photoUrl: string;
  telegramId?: string;
  Personals?: Personals[];
  Students?: Students[];
  WorkoutsGroups?: WorkoutsGroups[];
}
