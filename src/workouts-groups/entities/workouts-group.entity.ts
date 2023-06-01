import { Users, Methods } from '@prisma/client';

export class WorkoutsGroup {
  id: number;
  name: string;
  description: string;
  dateStart: Date;
  dateEnd: Date;
  level: number;
  userId: number;
  methodId: number;
  user?: Users;
  method?: Methods;
}
