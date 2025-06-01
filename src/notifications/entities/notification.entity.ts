import { Notifications } from '@prisma/client';

export class NotificationEntity implements Notifications {
  id: number;
  senderId: string;
  receiverId: string;
  message: string;
  type: string;
  readStatus: boolean;
  timestamp: Date;
  workoutSessionId: number | null;
}
