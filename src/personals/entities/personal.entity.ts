import { Users, Students } from '@prisma/client';

export class Personal {
  id: number;
  userId: number;
  user?: Users;
  Students?: Students[];
}
