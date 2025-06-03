import { WorkoutsGroups } from '@prisma/client';

export class Method {
  id: number;
  name: string;
  description: string;
  WorkoutsGroups?: WorkoutsGroups[];
}
