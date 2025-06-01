import { ClassBooking } from '@prisma/client';

export class ClassBookingEntity implements ClassBooking {
  id: number;
  personalClassScheduleId: number;
  studentId: string;
  bookingDate: Date;
  status: string;
}
