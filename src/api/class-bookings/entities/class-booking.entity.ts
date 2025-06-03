import { ClassBooking } from '@prisma/client';

export class ClassBookingEntity {
  id: number;
  personalClassScheduleId: number;
  studentId: string;
  bookingDate: Date;
  status: string;
  isRescheduled: boolean;
  originalClassBookingId?: number;
  originalClassBooking?: ClassBooking;
  rescheduledClasses?: ClassBooking[];
}
