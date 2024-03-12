import { Users, Students } from '@prisma/client';

export class Personal {
  id: number;
  userId: string;
  user?: Users;
  Students?: Students[];
}
