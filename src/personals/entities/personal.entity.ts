import { Users } from '@prisma/client';

export class Personal {
  id: number;
  userId: string;
  user?: Users;
  Students?: Users[];
  Personals?: Users[];
}
