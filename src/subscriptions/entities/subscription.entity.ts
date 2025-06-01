import { Subscription } from '@prisma/client';

export class SubscriptionEntity implements Subscription {
  id: number;
  userId: string;
  startDate: Date;
  endDate: Date | null;
  status: string;
  amount: number;
  paymentDate: Date;
}
